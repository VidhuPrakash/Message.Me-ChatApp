import React from "react";
import useConversation from "../../../zustand-store/useConversation";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected =
    selectedConversation && selectedConversation._id === conversation._id;

  const handleClick = () => {
    setSelectedConversation(conversation); // Refresh selectedConversation when clicking a new conversation
  };
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-red-500 rounded p-2 py-1 cursor-pointer 
      ${isSelected ? "bg-red-500" : ""}
      `}
        onClick={handleClick}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
