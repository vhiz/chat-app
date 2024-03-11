"use client";

import React, { useEffect } from "react";
import FriendItem from "./FriendItem";
import { getUsers } from "@/actions/user";
import toast from "react-hot-toast";
import useFriends from "@/store/useFriends";

export default function FriendsList() {
  const { friends, setFriends } = useFriends();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUsers();
        setFriends(res);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

    fetchData();
  }, [setFriends]);

  return (
    <div className="flex flex-col gap-y-4 overflow-y-scroll h-[80%] scrollbar-none">
      {friends.map((friend) => (
        <FriendItem key={friend?._id} friend={friend} />
      ))}
    </div>
  );
}
