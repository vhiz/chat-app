import { NextResponse } from "next/server";

import { getSession } from "@/actions/auth";
import { Conversation } from "@/lib/Conversation";
import { Message } from "@/lib/Message";

export async function POST(request) {
  const body = await request.json();
  const { receiverId, text } = body;
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

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
