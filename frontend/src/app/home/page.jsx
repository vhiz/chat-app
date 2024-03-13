import MessageContainer from "@/components/MessageContainer";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/mobileSidebar/SideBarMobile";
import { Toaster } from "react-hot-toast";
import { IoIosMenu, IoMdClose } from "react-icons/io";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="fixed top-5 left-5 z-10 flex lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
          <input type="checkbox" />

          <IoIosMenu className="swap-off fill-current text-2xl" />

          <IoMdClose className="swap-on fill-current text-2xl" />
        </label>
      </div>
      <div className="h-[90vh] w-[95vw] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-4 flex items-center justify-center lg:w-[90vw] lg:h-[80vh] drawer-content">
        <div className="hidden h-full lg:flex-1 lg:block">
          <SideBar />
        </div>
        <div className="w-full lg:flex-[2] h-full">
          <MessageContainer />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <SideBarMobile />
      </div>
      <Toaster />
    </div>
  );
}
