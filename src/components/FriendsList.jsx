import React from "react";
import FriendItem from "./FriendItem";
import { getUsers } from "@/actions/user";

export default async function FriendsList() {
  const getFriends = await getUsers();
  return (
    <div className="flex flex-col gap-y-4 overflow-y-scroll h-[80%] scrollbar-none">
      {getFriends.map((friend) => (
        <FriendItem key={friend?._id} friend={friend} />
      ))}
    </div>
  );
}
