import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserBasicInfo, getMediaURL } from "@/api/service";

interface ProfilePicProps {
  identifier: string | number; // username or user ID
  size?: number; // Optional size (defaults to 48)
}

const ProfilePic: React.FC<ProfilePicProps> = ({ identifier, size = 48 }) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // State to hold the token
  const baseUrl = getMediaURL();
  const borderSize = 96*4/size;

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userToken");
      setToken(storedToken); // Set token in state
    }
  }, []); // Empty dependency array means this effect runs only once

  useEffect(() => {
    if (!identifier || !token) return;

    getUserBasicInfo(identifier, token)
      .then((data) => {
        if (data?.profile_pic_url) {
          setProfilePicUrl(`${baseUrl}${data.profile_pic_url}`);
        }
      })
      .catch((err) => {
        console.error("Failed to load user profile picture", err);
      });
  }, [identifier, token]); // Runs when either identifier or token changes

  if (!profilePicUrl) {
    return (
      <div
        className="bg-gray-500 rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={profilePicUrl}
        alt="User's profile picture"
        fill
        className={`w-24 h-24 object-cover rounded-full border-${borderSize} border-black`} // Dynamically set the border size
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default ProfilePic;
