import React from "react";
import Messages from "./messages/Messages";
import MessageInput from "./messageInput/MessageInput";
import NoChatSelected from "./noChatSelected/NoChatSelected";

const MessageContainer = () => {
  const noChatSelected = false;
  return (
    <div className="min-w-[450px] flex flex-col">
      <>
        {noChatSelected ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="bg-red-950 px-4 py-2 mb-2">
              <span className="label-text">To: </span>
              <span className="text-gray-950 font-bold">John Doe</span>
            </div>

            <Messages />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};

export default MessageContainer;
