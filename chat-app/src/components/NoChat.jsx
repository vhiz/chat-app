import { LuMessagesSquare } from "react-icons/lu";

export default function NoChat() {
  return (
    <div className="w-full h-full flex items-center justify-center text-center text-2xl">
      Welcome 👋 There <br />
      Select a chat to start messaging <br />
      <LuMessagesSquare size={"1.5rem"} />
    </div>
  );
}
