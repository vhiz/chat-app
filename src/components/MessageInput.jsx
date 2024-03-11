"use client";
import { sendMessage } from "@/actions/message";
import useConversation from "@/store/useConversation";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { FiSend } from "react-icons/fi";

export default function MessageInput() {
  const [state, formAction] = useFormState(sendMessage, undefined);
  const { selectedConversation, loading, setLoading, setMessages, messages } =
    useConversation();
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    formAction(event);
    setText("");
    setMessages([...messages, state?.message]);
    setLoading(false);
  };
  return (
    <form action={handleSubmit}>
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
