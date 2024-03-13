"use client";
import React from "react";

export default function NotFound() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50 flex flex-col items-center justify-center text-white text-center">
    <div className="text-white text-4xl font-bold mb-10">404 Not Found</div>
    <div className="flex items-center justify-center">
      <div className="w-64 h-64 border-t-8 border-red-500 border-solid rounded-full animate-spin">
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="text-red-500 text-6xl" viewBox="0 0 512 512">
            <path d="M471.6,212.8c-26.6-26.6-68.4-26.6-95,0L256,400.4l-105.6-105.6c-26.6-26.6-68.4-26.6-95,0c-26.6,26.6-26.6,68.4,0,95l105.6,105.6L107.6,497.6c-26.6,26.6-68.4,26.6-95,0c-26.6-26.6-26.6-68.4,0-95L200.4,256L95.6,150.6c-26.6-26.6-26.6-68.4,0-95c13.3-13.3,31.1-20.3,48.4-20.3c17.4,0,35.1,7,48.4,20.3L256,200.4l105.6-105.6c13.3-13.3,31.1-20.3,48.4-20.3c17.4,0,35.1,7,48.4,20.3c26.6,26.6,26.6,68.4,0,95L294.4,256L439.6,361.6c26.6,26.6,26.6,68.4,0,95z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="w-48 h-4 border-t-4 border-red-500 border-solid rounded-full mt-5 animate-spin"></div>
    <div className="w-32 h-3 border-t-2 border-red-500 border-solid rounded-full mt-5 animate-spin"></div>
    <div className="w-20 h-2 border-t-2 border-red-500 border-solid rounded-full mt-5 animate-spin"></div>
  </div>
  );
}
