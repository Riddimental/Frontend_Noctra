"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/service"; // Ensure this function exists in your API service

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");  // New state for Date of Birth
  const [termsAccepted, setTermsAccepted] = useState(false);  // New state for Terms acceptance
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if the user is over 18 years old
    const age = calculateAge(dob);
    if (age < 18) {
      alert("You must be over 18 years old to register.");
      return;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
  
    try {
      const response = await registerUser(username, email, password, dob);
  
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

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
          {/* Date of Birth Field */}
          <input
            type="date"
            className="p-2 rounded border"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="text-sm text-gray-400">
              I accept the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
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
