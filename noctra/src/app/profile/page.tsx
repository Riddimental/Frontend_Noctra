"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Crown, Menu, Edit } from "lucide-react";
import { getProfile } from "@/api/service";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState<{
    username: string;
    cover_pic_url: string;
    profile_pic_url: string;
    is_vip: boolean;
    date_of_birth: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage the sidebar visibility
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      router.push("/auth"); // Redirect if not authenticated
      return;
    }

    if (profile) {
      setLoading(false); // Skip fetch if profile is already loaded
      return;
    }

    setLoading(true);

    getProfile(token)
      .then((data) => {
        setProfile(data);
        console.log("Profile loaded");
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
        alert("Error loading profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [profile, router]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/auth");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Prepend base URL to the image paths
  const baseUrl = "http://127.0.0.1:8000";

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gray-900 shadow-md z-10">
        {/* Left Side: Edit Icon */}
        <Edit className="w-6 h-6 cursor-pointer" onClick={() => console.log("Edit clicked")} />
        <h1 className="text-xl font-semibold">Profile</h1>

        {/* Right Side: Menu Icon */}
        <Menu className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        >
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 p-4">
            <ul className="space-y-4">
              <li>
                <button onClick={handleLogout} className="text-white">Logout</button>
              </li>
              <li>
                <button className="text-white">Settings</button>
              </li>
              <li>
                <button className="text-white">Contact Support</button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Cover Photo */}
      <div className="relative">
        {loading || !profile?.cover_pic_url ? (
          <div className="w-full h-40 bg-gray-500"></div>
        ) : (
          <Image
            src={`${baseUrl}${profile.cover_pic_url}`} // Full URL with base URL
            alt="Cover Photo"
            width={800}
            height={300}
            className="w-full h-40 object-cover"
            priority
          />
        )}

        {/* Profile Picture */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          {loading || !profile?.profile_pic_url ? (
            <div className="w-24 h-24 bg-gray-500 rounded-full"></div>
          ) : (
            <Image
              src={`${baseUrl}${profile.profile_pic_url}`} // Full URL with base URL
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full border-4 border-black"
              priority
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
