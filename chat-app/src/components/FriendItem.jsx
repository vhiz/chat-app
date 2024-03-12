"use client";

import useConversation from "@/store/useConversation";
import Image from "next/image";

export default function FriendItem({ friend, online }) {
  const { setSelectedConversation, selectedConversation } = useConversation();
  return (
    <div
      className={`w-full h-[4.5rem] cursor-pointer border items-center flex border-gray-200/20 p-2 rounded-md justify-between transition-all duration-300 ease-in-out hover:bg-blue-400 ${
        selectedConversation?._id === friend._id ? "bg-blue-500" : ""
      }`}
      onClick={() => setSelectedConversation(friend)}
    >
      <div className="flex items-center gap-x-4">
        <div className={`avatar ${online ? "online" : "offline"}`}>
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image alt="" fill className="object-cover" src={friend?.img} />
          </div>
        </div>
        <span className="text-xl font-bold">{friend.username}</span>
      </div>
      <span className=" text-xl">😅</span>
    </div>
  );
}
