import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../../hooks/useGetMessages";
import Skeleton from "../skeltons/skeletons.jsx";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavir: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((messages) => (
          <div key={messages._id} ref={lastMessage}>
            <Message key={messages._id} message={messages} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, index) => <Skeleton key={index} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
