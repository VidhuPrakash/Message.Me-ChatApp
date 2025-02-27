import { useEffect } from "react";
import { useSocketContext } from "./socketContext";
import useConversation from "../zustand-store/useConversation";
import useGetMessages from "../hooks/useGetMessages.js";

const useListenMessageStatus = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessage } = useConversation();
  const { messages } = useGetMessages(); // Get messages from useGetMessages

  useEffect(() => {
    if (!socket || !Array.isArray(messages)) return; // Ensure messages is an array

    // Listen for "delivered" updates
    socket.on("messageDelivered", ({ messageId, status }) => {
      console.log("Message Delivered Event Received:", messageId, status);

      if (!Array.isArray(messages)) return; // Prevent error if messages is undefined

      setMessage(
        messages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    // Listen for "read" updates
    socket.on("messageRead", ({ messageId, status }) => {
      console.log("Message Read Event Received:", messageId, status);

      if (!Array.isArray(messages)) return; // Prevent error if messages is undefined

      setMessage(
        messages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    return () => {
      socket.off("messageDelivered");
      socket.off("messageRead");
    };
  }, [socket, messages, setMessage, selectedConversation]);

  return null;
};

export default useListenMessageStatus;
