"use client";

import LoginForm from "@/components/LoginForm";
import useSocket from "@/store/useSocket";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const { session } = useSocket();
  const router = useRouter();

  if (session?.isLoggedIn) {
    router.push("/home");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[45vh] w-[90vw] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-4 flex flex-col items-center justify-center lg:w-[30vw]">
        <h1 className=" text-3xl text-white">
          Login
          <span className="text-blue-400 text-3xl"> ChatApp</span>
        </h1>
        <LoginForm />
        <Link href={"/register"} className="mt-4">
          {"Don't have an account?"}
        </Link>
      </div>
    </div>
  );
}
