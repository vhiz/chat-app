"use client";
import Messages from "./Messages";
import useConversation from "@/store/useConversation";
import NoChat from "./NoChat";
import MessageInput from "./MessageInput";
import { useEffect } from "react";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <>
      {selectedConversation ? (
        <div className=" h-full flex flex-col justify-between w-full lg:p-4">
          <div className=" w-full bg-gray-500/80 h-16 flex items-center p-2">
            <span className="text-lg font-bold text-gray-400">To: </span>
            <span className="text-lg font-bold ml-1">
              {" "}
              {selectedConversation?.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </div>
      ) : (
        <NoChat />
      )}
    </>
  );
}
