import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../../hooks/useGetMessages";
import Skeleton from "../skeltons/skeletons.jsx";
import useListenMessage from "../../../hooks/useListenMessage.js";
import useListenMessageStatus from "../../../context/messageStatus.jsx";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const [localMessages, setLocalMessages] = useState(messages);
  useListenMessage();
  useListenMessageStatus();

  const lastMessage = useRef();
  useEffect(() => {
    setLocalMessages(messages);
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavir: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        localMessages.length > 0 &&
        localMessages.map((messages) => (
          <div key={messages._id} ref={lastMessage}>
            <Message key={messages._id} message={messages} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, index) => <Skeleton key={index} />)}
      {!loading && localMessages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
