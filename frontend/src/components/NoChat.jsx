"use client";

import useSocket from "@/store/useSocket";
import { LuMessagesSquare } from "react-icons/lu";

export default function NoChat() {
  const { session } = useSocket();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-2xl">
      Welcome 👋 {session.username} <br />
      Select a chat to start messaging <br />
      <LuMessagesSquare  className=" text-center mt-3 text-8xl" />
    </div>
  );
}
