import Image from "next/image";
import moment from "moment";

export default function Message({
  own,
  message,
  selectedConversation,
  session,
}) {
  return (
    <div className={`chat mt-2 ${own ? "chat-end" : "chat-start"}`}>
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
        {own ? "Seen" : "Delivered"}{" "}
        {moment(message.createdAt.toString()).fromNow()}
      </div>
    </div>
  );
}
