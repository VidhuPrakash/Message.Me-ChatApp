import React from "react";
import SearchInput from "./searchInput/SearchInput";
import Conversations from "./conversation/Conversations";
import LogoutButton from "./logOutButton/LogoutButton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
