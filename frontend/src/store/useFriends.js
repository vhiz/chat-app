import { create } from "zustand";

export const useFriends = create((set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }), 
}));

export default useFriends;
