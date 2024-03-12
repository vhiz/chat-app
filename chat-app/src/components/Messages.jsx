"use client";

import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useConversation from "@/store/useConversation";
import { getMessage } from "@/actions/message";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { getSession } from "@/actions/auth";

export default function Messages() {
  const { messages, setMessages, setLoading, loading, selectedConversation } =
    useConversation();
  const [session, setSession] = useState();
  const lastMessage = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, selectedConversation?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const userMessages = await getMessage(selectedConversation?._id);
        setMessages(userMessages);
        const session = await getSession();
        setSession(session);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setLoading, setMessages]);
  return (
    <div className="w-full h-[70%] overflow-y-scroll scrollbar-none">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : messages.length < 1 ? (
        <div className="flex items-center w-full justify-center">
          <span className="text-gray-400 text-center">
            Send a message to start a conversation
          </span>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div className="" key={message._id} ref={lastMessage}>
              <Message
                own={message.own}
                message={message}
                selectedConversation={selectedConversation}
                session={session}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
