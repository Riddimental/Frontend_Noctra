"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/api/service";

export default function AuthPage() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getToken(username, password);
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('username', username);
        router.push("/profile");
      } else {
        setErrorMessage("Error retrieving user ID");
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage("User or password incorrect.");
      setShowModal(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-100">
      <div className="p-6 bg-black rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Noctra</h2>
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded w-full hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center text-white">
            Don't have an account? <a href="/register" className="text-blue-600">Register</a>
          </p>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <p className="mb-4">{errorMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 bg-red-600 rounded hover:bg-red-700 active:bg-red-800 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
