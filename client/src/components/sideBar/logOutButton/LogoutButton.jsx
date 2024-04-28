import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div className="mt-auto">
      <BiLogOutCircle className="w-6 h-6 text-white cursor-pointer" />
    </div>
  );
};

export default LogoutButton;
