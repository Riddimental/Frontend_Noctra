"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/service"; // Ensure this function exists in your API service

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    console.log("Submitting registration with:", { username, email, password });
  
    try {
      const response = await registerUser(username, email, password);
  
      console.log("API Response:", response);
  
      if (response?.token) {
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("username", username);
        console.log("Registration successful");
        router.push("/profile");
      } else {
        alert("Error registering user. Check console for details.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error registering user.");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-100">
      <div className="p-6 bg-black rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Noctra - Register</h2>
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 rounded border"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded w-full hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          >
            Register
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <a href="/auth" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
