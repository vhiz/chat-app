import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[60vh] w-[90vw] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-4 flex flex-col items-center justify-center lg:w-[30vw]">
        <h1 className=" text-3xl text-white">
          Register
          <span className="text-blue-400 text-3xl"> ChatApp</span>
        </h1>
        <RegisterForm />
        <Link href={"/"} className="mt-4">
          {" Have an account?"}
        </Link>
      </div>
    </div>
  );
}
