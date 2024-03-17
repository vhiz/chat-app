"use client";

import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useConversation from "@/store/useConversation";
import { getMessage } from "@/actions/message";
import Loading from "./Loading";
import toast from "react-hot-toast";
import useSocket from "@/store/useSocket";
import { IoChatbubbleOutline } from "react-icons/io5";

export default function Messages() {
  const { messages, setMessages, setLoading, loading, selectedConversation } =
    useConversation();
  const { socket, session } = useSocket();
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
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setLoading, setMessages]);

  useEffect(() => {
    socket?.on("getMessage", function (newMessage) {
      // If the new message is not for this conversation, ignore it
      if (
        !selectedConversation ||
        !newMessage.conversationId.includes(selectedConversation._id)
      )
        return;
      const play = new Audio("/sound.mp3");
      play.play();
      setMessages([...messages, { ...newMessage.content, shouldShake: true }]);
    });
    return () => socket?.off("getMessage");
  }, [socket, messages, selectedConversation?._id]);

  useEffect(() => {
    socket?.on("getMessage", function (newMessage) {
      if (
        !newMessage.conversationId.includes(session.userId) ||
        newMessage.conversationId.includes(selectedConversation?._id)
      )
        return;
      const play = new Audio("/message.mp3");
      play.play();
      toast(
        `${newMessage.senderName} :
      ${newMessage?.content?.text}`,
        {
          icon: <IoChatbubbleOutline />,
          position: "top-right",
        }
      );
    });
    return () => socket?.off("getMessage");
  }, [socket, messages, selectedConversation?._id]);

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
                own={session.userId === message.senderId}
                message={message}
                selectedConversation={selectedConversation}
                session={session}
                messages={messages}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
