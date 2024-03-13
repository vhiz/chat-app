import mongoose from "mongoose";
const connection = {};
export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGODB);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};

export const defaultSession = {
  isLoggedIn: false,
};
export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "chat-app-social-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 1000,
  },
};
