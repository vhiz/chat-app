import Image from "next/image";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useSocket from "@/store/useSocket";

export default function Message({
  own,
  message,
  selectedConversation,
  session,
  messages,
}) {
  const messageRef = useRef(message);
  const [seenMessages, setSeenMessages] = useState([]);
  const { sentMessage } = useSocket();
  useEffect(() => {
    const seenMessages = messages
      .filter((msg) => !msg.read && msg.senderId === session.userId)
      .map((msg) => msg._id);
    setSeenMessages(seenMessages);
  }, [messages]);

  // useEffect should run if this component is viewed

  useEffect(() => {
    async function editData() {
      try {
        await axios.put("/api/message", { messageId: message._id });
      } catch (error) {
        toast("something went wrong");
      }
    }

    //should run only if the message component is viewed on the screen

    if (messageRef.current && !own) editData();
  }, [message._id, own, messages, sentMessage]);
  return (
    <div
      className={`chat mt-2 ${own ? "chat-end" : "chat-start"}`}
      ref={messageRef}
    >
      <div className="chat-image avatar">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <Image
            alt=""
            src={own ? session?.img : selectedConversation?.img}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          own ? "chat-bubble-primary text-white" : ""
        } ${message.shouldShake ? "shake" : ""}`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50">
        {own
          ? seenMessages.includes(message._id)
            ? "Sent"
            : "Seen"
          : "Delivered"}{" "}
        {moment(message.createdAt.toString()).fromNow()}
      </div>
    </div>
  );
}
