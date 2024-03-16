"use client";

import { getSession } from "@/actions/auth";
import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/mobileSidebar/SideBarMobile";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import io from "socket.io-client";
import toast from "react-hot-toast";
import useSocket from "@/store/useSocket";
import useConversation from "@/store/useConversation";

export default function Home() {
  const { setOnlineUsers, setSocket, session, setSession, onlineUsers } =
    useSocket();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getSession();
        setSession(session);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!session?.userId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND);
    setSocket(newSocket);
    newSocket.emit("addUsers", session.userId);
    newSocket.on("onlineUsers", (data) => {
      setOnlineUsers(
        data.map((o) => {
          return o.userId;
        })
      );
    });

    return () => {
      newSocket.close();
    };
  }, [session?.userId]);

  return (
    <div className="flex items-center justify-center h-screen drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="fixed top-5 left-5 z-10 flex lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
          <input type="checkbox" />

          <IoIosMenu className="swap-off text-2xl" />

          <IoMdClose className="swap-on text-2xl"/>
        </label>
      </div>
      <div className="h-[90vh] w-[95vw] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-4 flex items-center justify-center lg:w-[90vw] lg:h-[80vh] drawer-content">
        <div className="hidden h-full lg:flex-1 lg:block">
          <SideBar />
        </div>
        <div className="w-full lg:flex-[2] h-full">
          <MessageContainer />
        </div>
      </div>
      <div className="drawer-side lg:hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <SideBarMobile />
      </div>
      <Toaster />
    </div>
  );
}
