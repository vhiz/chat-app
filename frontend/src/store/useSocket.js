import { create } from "zustand";

export const useSocket = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  onlineUsers: [],
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
  session: {},
  setSession: (session) => set({ session }),
  sentMessage: false,
  setSendMessage: (sent) => set({ sentMessage: sent }),
}));

export default useSocket;
