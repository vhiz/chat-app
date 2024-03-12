"use server";
import { User } from "@/lib/User";
import { getSession } from "./auth";
import { connectToDB } from "@/lib/utils";

export const getUsers = async () => {
  connectToDB();
  try {
    const session = await getSession();
    const allUsers = await User.find({ _id: { $ne: session.userId } }).select(
      "-password"
    );
    return allUsers;
  } catch (error) {
    throw error;
  }
};
