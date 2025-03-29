"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Crown, LogOut, Menu } from "lucide-react";
import {getProfilePic, getPostPic, getCoverPic } from "@/utils/auxiliar_functions";
import { getProfile } from "@/api/service";


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState<{
    username: string;
    cover_pic: string;
    profile_pic: string;
    is_vip: boolean;
    date_of_birth: string;
  } | null>(null);

  const [coverPic, setCoverPic] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      router.push("/auth"); // Redirect if not authenticated
      return;
    }

    setLoading(true); // Start loading before the API call
    getProfile(token)
      .then((response) => {
        setProfile(response.data);
        console.log("Profile fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Error fetching profile");
      })
      .finally(() => {
        setLoading(false); // Stop loading once the request is finished
      });

    // Fetch images
    getCoverPic().then((url) => setCoverPic(url)).catch(() => setCoverPic(null)); // Handle image fetching error
    getProfilePic().then((url) => setProfilePic(url)).catch(() => setProfilePic(null)); // Handle image fetching error
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/auth"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gray-900 shadow-md">
        <LogOut className="w-6 h-6 cursor-pointer" onClick={handleLogout} />
        <h1 className="text-xl font-semibold">Profile</h1>
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Cover Photo */}
      <div className="relative">
        {/* Cover photo */}
        {loading || !coverPic ? (
          <div className="w-full h-40 bg-gray-500"></div> // Fallback placeholder
        ) : (
          <Image
            src={coverPic}
            alt="Cover Photo"
            width={800}
            height={300}
            className="w-full h-40 object-cover"
          />
        )}

        {/* Profile Picture */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          {loading || !profilePic ? (
            <div className="w-24 h-24 bg-gray-500 rounded-full"></div> // Fallback placeholder
          ) : (
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full border-4 border-black"
            />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-12 flex flex-col items-center">
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">@{profile?.username}</h2>
              {profile?.is_vip && <Crown />}
            </div>
            <p className="text-gray-400 text-sm">Born: {profile?.date_of_birth}</p>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-700 flex justify-center">
        {["posts", "tagged", "more"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-4 flex-1 text-center ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        {activeTab === "posts" && <p>Posts Section</p>}
        {activeTab === "tagged" && <p>Tagged In Section</p>}
        {activeTab === "more" && <p>More Section</p>}
      </div>
    </div>
  );
}
