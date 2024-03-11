import React from "react";
import SearchContainer from "./SearchContainer";
import FriendsList from "./FriendsList";
import Logout from "./Logout";

export default function SideBar() {
  return (
    <div className="p-4 flex flex-col justify-between h-full border-r border-gray-500/20">
      <SearchContainer />
      <FriendsList />
      <Logout />
    </div>
  );
}
