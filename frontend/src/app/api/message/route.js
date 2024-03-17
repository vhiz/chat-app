import { NextResponse } from "next/server";

import { getSession } from "@/actions/auth";
import { Conversation } from "@/lib/Conversation";
import { Message } from "@/lib/Message";
import { connectToDB } from "@/lib/utils";

export async function POST(request) {
  connectToDB();
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

export async function PUT(request) {
  connectToDB();

  try {
    const body = await request.json();
    const id = body.messageId;

    //edit the field read to true
    const updatedField = { read: true };
    await Message.findByIdAndUpdate(id, { $set: updatedField });

    return NextResponse.json("Updated", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
