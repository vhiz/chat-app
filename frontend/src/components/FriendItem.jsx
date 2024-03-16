"use client";

import { getMessage } from "@/actions/message";
import useConversation from "@/store/useConversation";
import useSocket from "@/store/useSocket";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function FriendItem({ friend }) {
  const { setSelectedConversation, selectedConversation, messages } =
    useConversation();
  const { onlineUsers, session, sentMessage } = useSocket();
  const [lastMessage, setLastMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userMessages = await getMessage(friend?._id);
        setLastMessage(userMessages[userMessages.length - 1]);

        //find all the messages from the userMessages array which read is false and also find all the messages where the receiverId === session.userId

        const unreadMessages = userMessages.filter(
          (msg) => !msg.read && msg.receiverId === session.userId
        );

        setUnreadMessages(unreadMessages);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, [friend?._id, messages, session.userId, sentMessage]);

  return (
    <label
      className={`w-full h-[4.5rem] cursor-pointer border items-center flex border-gray-200/20 p-2 rounded-md justify-between transition-all duration-300 ease-in-out hover:bg-blue-400 ${
        selectedConversation?._id === friend._id ? "bg-blue-500" : ""
      }`}
      htmlFor="my-drawer"
      onClick={() => setSelectedConversation(friend)}
    >
      <div className="flex items-center gap-x-4">
        <div
          className={`avatar ${
            onlineUsers.includes(friend._id) ? "online" : "offline"
          }`}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image alt="" fill className="object-cover" src={friend?.img} />
          </div>
        </div>
        <span className="text-xl font-bold">{friend.username}</span>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className=" text-sm text-gray-600">
          {lastMessage?.text?.length > 10
            ? lastMessage?.text?.slice(0, 10) + "...."
            : lastMessage?.text}
        </span>
        {unreadMessages.length > 0 && (
          <div className="badge badge-error badge-sm text-white text-xs">
            {unreadMessages.length}
          </div>
        )}
      </div>
    </label>
  );
}
