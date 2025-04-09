"use client";

import { useState, useEffect } from "react";
import { Search, Users, Flame } from "lucide-react";
import Image from "next/image";

export default function RadarPage() {
  const [search, setSearch] = useState("");
  const [filters] = useState(["Latino", "Techno", "Salsa", "Reggaeton"]);
  const [nightclubs, setNightclubs] = useState<{ x: number; y: number }[]>([]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
      // Generate random nightclubs
      setNightclubs(
        Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
      );
    }, 3000); // Radar pulse every 3 sec
    return () => clearInterval(interval);
  }, []);

  
  const profile = JSON.parse(localStorage.getItem('profileData'));

  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div className="flex flex-col min-h-screen pb-24"> {/* Prevent overlap */}
      {/* Top Bar */}
      <div className="p-4 bg-gray-900 shadow-md">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search nightclubs..."
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        {/* Filter Section */}
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Section */}
      <div className="flex-1 flex flex-col justify-center items-center relative">
        {/* Map (Just a placeholder image) */}
        <div className="relative w-64 h-64 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
          {/* Pulse effect */}
          <div
            className={`absolute w-full h-full bg-blue-500 opacity-30 rounded-full ${
              pulse ? "animate-ping" : ""
            }`}
          />
          {/* Nightclub Icons */}
          {nightclubs.map((club, index) => (
            <div
              key={index}
              className="absolute bg-red-500 w-3 h-3 rounded-full"
              style={{ top: `${club.y}%`, left: `${club.x}%` }}
            />
          ))}
          {/* User Profile Picture */}
          <div className="absolute">
            <Image
              src={`${baseUrl}${profile.profile_pic}`} // Change to dynamic profile picture
              alt="User Profile"
              width={50}
              height={50}
              className="rounded-full w-30 h-30 border-4 border-white"
            />
          </div>
        </div>

        {/* Top Right & Left Buttons */}
        <button className="absolute top-6 right-6 bg-gray-800 p-3 rounded-full">
          <Users className="w-5 h-5 text-white" />
        </button>
        <button className="absolute top-6 left-6 bg-gray-800 p-3 rounded-full">
          <Flame className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Buttons Section - Now with padding to avoid navbar overlap */}
      <div className="p-4 bg-gray-900 space-y-3">
        {/* Top Buttons */}
        <div className="flex justify-between gap-4">
          <button className="flex-1 bg-gray-800 py-2 rounded hover:bg-gray-700">
            Add to Favorites
          </button>
          <button className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700">
            Buy Tickets
          </button>
        </div>
        {/* Bottom Full-Width Button */}
        <button className="w-full bg-green-600 py-3 rounded hover:bg-green-700">
          Create Event
        </button>
      </div>
    </div>
  );
}
