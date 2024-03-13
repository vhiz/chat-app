import { Schema, models, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: {
      type: [String],
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Conversation =
  models.Conversation || model("Conversation", conversationSchema);
