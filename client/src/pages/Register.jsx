import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    console.log(response.data);

    alert("Registration Successful");
    navigate("/Login");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.error ||
      "Registration failed"
    );

  }
};

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8">

        {/* Heading */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400">
            Start tracking your placements
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
            />

          </div>

          {/* Email */}
          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
            />

          </div>

          {/* Password */}
          <div>
      <label className="block text-sm text-zinc-400 mb-2">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500 text-white"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
    </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold text-white"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 mt-6">

          Already have an account?{" "}

          <Link to="/login" className="text-blue-400 cursor-pointer hover:text-blue-300">
            Login
          </Link>
        </p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-center mt-4 block">
            ← Back to Home
          </Link>

      </div>

    </div>

  );
}

export default Register;