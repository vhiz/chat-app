import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[80vh] w-[90vw] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-4 flex items-center justify-center">
        <div className="flex-1 h-full">
          <SideBar />
        </div>
        <div className="flex-[2] h-full">
          <MessageContainer />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
