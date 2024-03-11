import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { User } from "@/lib/User";

export async function POST(request) {
  connectToDB();
  const body = await request.json();
  const { username, password, gender } = body;

  const salt = bcrypt.genSaltSync(13);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    connectToDB();
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (user) {
      NextResponse.json({ error: "User Already Exist" }, { status: 403 });
    }

    const girlImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      username,
      password: hashedPassword,
      img: gender === "male" ? boyImg : girlImg,
    });
    newUser.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 400 }
    );
  }
}
