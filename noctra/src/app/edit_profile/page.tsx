"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch"; // Assuming you're using a UI lib

export default function EditProfilePage() {
  const [bio, setBio] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Function) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 255) {
      setBio(e.target.value);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

      {/* Profile Picture Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Profile Picture</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePic)} />
      </div>

      {/* Cover Picture Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Cover Picture</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCoverPic)} />
      </div>

      {/* Subscribe to VIP */}
      <button className="p-2 bg-yellow-500 rounded w-full mb-4" onClick={() => router.push("/subscribe")}>Subscribe to VIP</button>

      {/* Edit Bio */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Bio</label>
        <div className="relative">
          <textarea
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={bio}
            onChange={handleBioChange}
            placeholder="Write something about yourself..."
          />
          <span className={`absolute bottom-2 right-2 text-xs ${bio.length === 255 ? "text-red-500" : "text-gray-400"}`}>{bio.length}/255</span>
        </div>
      </div>

      {/* Playlist URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Playlist (Spotify URL)</label>
        <input
          type="url"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={playlist}
          onChange={(e) => setPlaylist(e.target.value)}
          placeholder="Enter your Spotify playlist URL"
        />
      </div>

      {/* Public Profile Toggle */}
      <div className="mb-4 flex justify-between items-center">
        <span>Public Profile</span>
        <Switch checked={publicProfile} onCheckedChange={() => {
          setPublicProfile(!publicProfile);
          console.log(publicProfile ? "Private" : "Public");
        }} />
      </div>

      {/* Anonymous Mode Toggle */}
      <div className="mb-4 flex justify-between items-center">
        <span>Go Anonymous</span>
        <Switch checked={anonymous} onCheckedChange={() => {
          setAnonymous(!anonymous);
          console.log(anonymous ? "Sharing" : "Hiding");
        }} />
      </div>

      {/* Delete Profile */}
      <button className="p-2 bg-red-600 rounded w-full" onClick={() => console.log("Profile deleted (implement API call)")}>Delete Profile</button>
    </div>
  );
}
