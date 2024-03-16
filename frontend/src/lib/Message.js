import { Schema, models, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: String,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      ref: "Conversation",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", messageSchema);
