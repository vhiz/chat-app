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
export const findUsers = async (search) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get the current user session
    const session = await getSession();

    // Define the query to search for users
    const query = {
      _id: { $ne: session.userId },
      username: { $regex: new RegExp(`^${search}$`, "i") },
    };

    // Find all users that match the query
    const allUsers = await User.find(query)
      .select("-password") // Exclude the password field from the result
      .exec();

    return allUsers;
  } catch (error) {
    throw error;
  }
};
