"use client";
import useConversation from "@/store/useConversation";
import useFriends from "@/store/useFriends";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
export default function SearchContainer() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { friends } = useFriends();

  function handleSubmit(e) {
    e.preventDefault();

    if (!search) return;
    if (search.length < 4) {
      return toast.error(
        "Characters length should be  more than or equal to four"
      );
    }

    const friend = friends.find((f) =>
      f.username.toLowerCase().includes(search.toLowerCase())
    );

    if (friend) {
      setSelectedConversation(friend);
      setSearch("");
    } else {
      toast.error("No such user");
    }
  }
  return (
    <div className="flex w-full">
      <form
        action=""
        className="flex w-full items-center gap-x-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full rounded-full p-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary text-white rounded-full"
          type="submit"
        >
          <FiSearch size={"1rem"} />
        </button>
      </form>
    </div>
  );
}
