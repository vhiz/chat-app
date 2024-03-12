"use client";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useFormState } from "react-dom";
import { login } from "@/actions/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [seePassword, setSeePassword] = useState(false);

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
       await axios.post("/api/login", inputs);
      router.push("/home");
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="mt-4 flex flex-col gap-y-4 w-full" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <FaUser size={"1rem"} />
        <input
          type="text"
          className="grow"
          placeholder="Username"
          name="username"
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
          required
          onChange={handleChange}
        />
        <label
          className="swap swap-rotate"
          onClick={() => setSeePassword(!seePassword)}
        >
          <input type="checkbox" />
          <FiEye className="swap-on " />
          <FiEyeOff className="swap-off " />
        </label>
      </label>
      <button
        type="submit"
        className="btn btn-active btn-primary text-white"
        disabled={loading}
      >
        Login
      </button>
      {error && <span className="text-error text-center">{error}</span>}
    </form>
  );
}
