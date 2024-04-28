import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p className="text-red-300">
          Howdy!! <span className="text-red-500">fullName</span>{" "}
        </p>
        <p className="text-red-300">Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
