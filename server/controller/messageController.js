import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

/**
 * @api {post} /messages/send/:id Send Message
 * @apiName SendMessage
 * @apiGroup Message
 * @apiDescription Sends a message from the logged-in user to the user with the given id.
 *
 * @apiParam {String} id The id of the user to send the message to.
 * @apiParam {String} message The content of the message.
 *
 * @apiSuccess {Object} message The newly created message object.
 *
 * @apiError {String} error The error message.
 *
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internel Server Error!"
 * }
 */

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    io.to(getReceiverSocketId(senderId)).emit("messageSent", newMessage);
    // this will run parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // socket io funtionality

    const receiverSocktId = getReceiverSocketId(receiverId);
    if (receiverSocktId) {
      // io.to(socketID).emit() used to send events to specific client
      io.to(receiverSocktId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internel server error" });
  }
};

/**
 * @api {get} /messages/get/:id Get Messages
 * @apiName GetMessage
 * @apiGroup Message
 * @apiDescription Gets all the messages between the logged in user and the user with the given id
 *
 * @apiParam {String} id The id of the user to get messages with
 *
 * @apiSuccess {Array} messages The array of messages
 *
 * @apiError {String} error The error message
 *
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internel Server Error!"
 * }
 */
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    await Message.updateMany(
      {
        senderId: userToChatId,
        receiverId: senderId,
        status: { $ne: "read" },
      },
      { $set: { status: "read" } }
    );

    messages.forEach((msg) => {
      io.to(getReceiverSocketId(msg.senderId)).emit("messageRead", {
        messageId: msg._id,
        status: "read",
      });
    });

    if (!messages || messages.length === 0) {
      return res.status(200).json([]); // Return an empty array if no messages found
    }

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internel server error" });
  }
};
