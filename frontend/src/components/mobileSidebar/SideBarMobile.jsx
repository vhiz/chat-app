import React from "react";
import SearchContainer from "../SearchContainer";
import FriendsList from "../FriendsList";
import Logout from "../Logout";

export default function SideBarMobile() {
  return (
    <div className="p-4 flex flex-col justify-center w-full h-full lg:justify-between">
      <SearchContainer />
      <FriendsList />
      <Logout />
    </div>
  );
}
