"use client";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function RegisterForm() {
  const [seePassword, setSeePassword] = useState(false);
  const [gender, setGender] = useState("male");
  const [state, formAction] = useFormState(register, undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("/api/register", { ...inputs, gender });
      // router.push("/");
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-y-4 w-full">
      <label className="input input-bordered flex items-center gap-2">
        <FaUser size={"1rem"} />
        <input
          type="text"
          className="grow"
          placeholder="Username"
          name="username"
          minLength={5}
          onChange={handleChange}
          required
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <RiLockPasswordFill size={"1rem"} />
        <input
          type={seePassword ? "text" : "password"}
          className="grow placeholder:opacity-[0.5]"
          placeholder="🔘🔘🔘🔘🔘🔘"
          name="password"
          minLength={5}
          onChange={handleChange}
          required
        />
        <label
          className="swap swap-rotate"
          onClick={() => setSeePassword((prev) => !prev)}
        >
          <input type="checkbox" />
          <FiEye className="swap-on " />
          <FiEyeOff className="swap-off " />
        </label>
      </label>
      <div className="flex gap-x-4">
        <label
          htmlFor="male"
          className={`${
            gender === "male" ? "bg-[#222]/80" : "bg-[#222]/20"
          } rounded-md p-2 cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => setGender("male")}
        >
          <div className="relative w-20 h-20">
            <Image
              alt=""
              fill
              src={"https://avatar.iran.liara.run/public/1.png"}
            />
          </div>
        </label>
        <input
          type="radio"
          // name="gender"
          className="hidden radio"
          value={"male"}
          id="male"
          checked={gender === "male"}
        />
        <label
          htmlFor="female"
          className={`${
            gender === "female" ? "bg-[#222]/80" : "bg-[#222]/20"
          } rounded-md p-2 cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => setGender("female")}
        >
          <div className="relative w-20 h-20">
            <Image
              alt=""
              fill
              src={"https://avatar.iran.liara.run/public/80.png"}
            />
          </div>
        </label>
        <input
          type="radio"
          // name="gender"
          className="hidden"
          value={"female"}
          id="female"
          checked={gender === "female"}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="btn btn-active btn-primary text-white"
      >
        Register
      </button>
      {error && (
        <span className=" text-center text-error text-xl">{error}</span>
      )}
    </form>
  );
}
