import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();
  console.log("CONVERSATIONS:", conversation);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? <span className="loading loading-dots mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;
