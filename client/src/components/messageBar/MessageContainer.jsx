import React, { useEffect } from "react";
import Messages from "./messages/Messages";
import MessageInput from "./messageInput/MessageInput";
import NoChatSelected from "./noChatSelected/NoChatSelected";
import useConversation from "../../zustand-store/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-red-950 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-white  font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
