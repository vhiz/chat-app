"use client";
import { FaSpinner } from "react-icons/fa";

export default function loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50 flex flex-col items-center justify-center text-white text-center">
      <div className="text-white text-4xl font-bold mb-10">
        Chat with your friends
      </div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 border-t-8 border-blue-500 border-solid rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaSpinner className="text-blue-500 text-6xl" />
          </div>
        </div>
      </div>
      <div className="w-48 h-4 border-t-4 border-blue-500 border-solid rounded-full mt-5 animate-spin"></div>
      <div className="w-32 h-3 border-t-2 border-blue-500 border-solid rounded-full mt-5 animate-spin"></div>
      <div className="w-20 h-2 border-t-2 border-blue-500 border-solid rounded-full mt-5 animate-spin"></div>
    </div>
  );
}
