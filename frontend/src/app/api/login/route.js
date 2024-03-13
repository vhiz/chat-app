import { NextResponse } from "next/server";

import { getSession } from "@/actions/auth";
import { User } from "@/lib/User";
import { connectToDB } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function POST(request) {
  connectToDB();
  const body = await request.json();

  const { username, password } = body;
  try {
    const session = await getSession();

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return NextResponse.json({ error: "Invalid inputs" }, { status: 403 });

    session.userId = user._id;
    session.username = user.username;
    session.img = user.img;
    session.isLoggedIn = true;

    await session.save();
    return NextResponse.json(
      { message: "Successfully logged in!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
