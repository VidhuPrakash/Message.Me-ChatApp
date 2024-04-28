import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://pics.craiyon.com/2023-05-29/69d183130848490eae6fbb912c584b36.webp"
            alt=""
          />
        </div>
      </div>
      <div className={"chat-bubble text-white bg-red-500"}>Good Morning</div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
        12:49
      </div>
    </div>
  );
};

export default Message;
