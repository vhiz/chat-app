"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { connectToDB, defaultSession, sessionOptions } from "@/lib/utils";
import { User } from "@/lib/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const register = async (previousState, formData) => {
  const { username, password, gender } = Object.fromEntries(formData);

  const salt = bcrypt.genSaltSync(13);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    connectToDB();
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (user) {
      return { error: "User Already Exist" };
    }

    const girlImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      username,
      password: hashedPassword,
      img: gender === "male" ? boyImg : girlImg,
    });
    newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something Went Wrong" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  connectToDB();
  try {
    const session = await getSession();

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });
    if (!user) return { error: "User does not exist" };

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return { error: "Invalid inputs" };

    session.userId = user._id;
    session.username = user.username;
    session.img = user.img;
    session.isLoggedIn = true;
    
    await session.save();
    redirect("/home");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
