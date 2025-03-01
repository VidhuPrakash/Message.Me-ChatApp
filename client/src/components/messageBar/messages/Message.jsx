import React, { useEffect } from "react";
import useConversation from "../../../zustand-store/useConversation";
import { useAuthContext } from "../../../context/AuthContext";
import extractTime from "../../../utils/extractTime";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const formatTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const selectClass = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-red-500" : "";

  // Determine tick color
  const getStatusIcon = () => {
    if (message.status === "sent") return <BsCheck className="text-gray-400" />;
    if (message.status === "delivered")
      return <BsCheckAll className="text-gray-400" />;
    if (message.status === "read")
      return <BsCheckAll className="text-blue-500" />;
  };

  return (
    <div className={`chat ${selectClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
        {formatTime} {fromMe && getStatusIcon()}
      </div>
    </div>
  );
};

export default Message;
