"use server";
import { Conversation } from "@/lib/Conversation";
import { Message } from "@/lib/Message";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export const sendMessage = async (previousState, formData) => {
  const { receiverId, text } = Object.fromEntries(formData);
  try {
    const session = await getSession();

    const senderId = session.userId;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      conversationId: conversation._id,
    });

    await newMessage.save();

    return { message: newMessage };
  } catch (error) {
    throw error;
  }
};

export const getMessage = async (receiverId) => {
  try {
    const session = await getSession();

    const senderId = session.userId;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) return [];
    const messages = await Message.find({ conversationId: conversation._id });

    return messages;
  } catch (error) {
    throw error;
  }
};
