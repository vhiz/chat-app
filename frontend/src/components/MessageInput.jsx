"use client";
import useConversation from "@/store/useConversation";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import useSocket from "@/store/useSocket";

export default function MessageInput() {
  const { selectedConversation, loading, setLoading, setMessages, messages } =
    useConversation();
  const { socket, session, setSendMessage } = useSocket();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/message", {
        text,
        receiverId: selectedConversation?._id,
      });
      setMessages([...messages, { ...res.data.message }]);
      setText("");

      socket?.emit("privateMessage", {
        conversationId: [session.userId, selectedConversation?._id],
        receiverId: selectedConversation?._id,
        content: { ...res.data.message },
        senderName: session.username,
      });
      setSendMessage(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setSendMessage(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="hidden"
          name="receiverId"
          value={selectedConversation?._id}
        />
        <input
          type="text"
          className="grow"
          placeholder="Send a message...."
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button disabled={loading}>
          <FiSend size={"1.2rem"} />
        </button>
      </label>
    </form>
  );
}
