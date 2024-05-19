import React from "react";
import Sidebar from "../../components/sideBar/Sidebar";
import MessageContainer from "../../components/messageBar/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="p-5 text-red-200 font-bold ">
        ChatMe
        <div className=" text-red-600 font-light  ">platform</div>
      </div>

      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
