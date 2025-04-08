"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProtectedPage from "@/components/ui/ProtectedPage"; // Import ProtectedPage
import { getProfilePic, getPostPic } from "@/utils/auxiliar_functions";
import NotificationDrawer from "@/components/ui/NotificationDrawer"; // Import NotificationDrawer
import NightlifeTopBar from "@/components/ui/NightLifeTopBar"; // Import the new TopBar component

async function generateRandomPosts(numPosts: number) {
  const usernames = [
    "dj_nightowl",
    "club_vibes",
    "partyqueen",
    "rave_mania",
    "midnightmoves",
    "nightlife_ninja",
  ];
  const heights = ["h-64", "h-80", "h-96", "h-72"];

  const posts = [];

  for (let i = 1; i <= numPosts; i++) {
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomProfilePic = await getProfilePic().catch(() => null); // Handle image fetching error
    const randomVideo = await getPostPic().catch(() => null); // Handle image fetching error
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];

    posts.push({
      id: i,
      username: randomUsername,
      profilePic: randomProfilePic,
      video: randomVideo,
      height: randomHeight,
    });
  }

  return posts;
}

export default function NightlifePage() {
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer visibility

  useEffect(() => {
    const fetchPosts = async () => {
      const generatedPosts = await generateRandomPosts(1);
      setPosts(generatedPosts);
    };

    fetchPosts();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ProtectedPage>
      <div className="relative min-h-screen bg-black text-white">
        {/* Replace with new TopBar */}
        <NightlifeTopBar onNotificationClick={toggleDrawer} />

        {/* Notification Drawer */}
        <NotificationDrawer open={drawerOpen} onClose={toggleDrawer} />

        {/* Masonry Grid Layout */}
        <main className="mt-16 px-4 columns-3 gap-3 space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`relative ${post.height} w-full bg-gray-900 rounded-lg overflow-hidden`}
            >
              {/* User Info */}
              <div className="absolute top-2 left-2 flex items-center gap-2 z-10 bg-black/50 p-2 rounded-full">
                <Image
                  src={post.profilePic || "/default-profile-pic.png"}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{post.username}</span>
              </div>

              {/* Video Post */}
              <video
                src={post.video || "/default-video.mp4"}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </main>
      </div>
    </ProtectedPage>
  );
}
