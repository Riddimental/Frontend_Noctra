"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { getProfile, updateProfile } from "@/api/service";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");
  const [coverPicUrl, setCoverPicUrl] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);

  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const profile = await getProfile(token);
          setBio(profile.bio || "");
          setPlaylist(profile.playlist || "");
          setPublicProfile(profile.publicProfile ?? true);
          setAnonymous(profile.anonymous ?? false);
          setProfilePicUrl(profile.profile_pic || "");
          setCoverPicUrl(profile.cover_pic || "");
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    }
    fetchProfile();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
      setHasChanges(true);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 150) {
      setBio(e.target.value);
      setHasChanges(true);
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return router.push("/auth");

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("playlist", playlist);
    formData.append("publicProfile", publicProfile.toString());
    formData.append("anonymous", anonymous.toString());
    if (profilePic) formData.append("profile_pic", profilePic);
    if (coverPic) formData.append("cover_pic", coverPic);

    try {
      await updateProfile(formData, token);
      setHasChanges(false);
      router.push("/profile");
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-black text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => router.push("/profile")}
        />
        <h1 className="text-xl font-bold flex-1 text-center">Edit Profile</h1>
        <button
          className={`flex items-center gap-1 text-sm ${!hasChanges ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSaveChanges}
          disabled={!hasChanges}
        >
          <Save className="w-5 h-5" />
          Save
        </button>
      </div>

      {/* Images */}
      <div className="space-y-6 mb-6">
        {/* Profile Pic */}
        <div>
          <label className="block text-sm mb-2">Profile Picture</label>
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer"
            onClick={() => document.getElementById("profilePicInput")?.click()}
          >
            {profilePicUrl && (
              <Image
                src={`${baseUrl}${profilePicUrl}`}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-white">
              Edit
            </div>
          </div>
          <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setProfilePic)}
            className="hidden"
          />
        </div>

        {/* Cover Pic */}
        <div>
          <label className="block text-sm mb-2">Cover Picture</label>
          <div
            className="relative w-full h-40 rounded-md overflow-hidden cursor-pointer"
            onClick={() => document.getElementById("coverPicInput")?.click()}
          >
            {coverPicUrl && (
              <Image
                src={`${baseUrl}${coverPicUrl}`}
                alt="Cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-sm text-white">
              Edit
            </div>
          </div>
          <input
            id="coverPicInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setCoverPic)}
            className="hidden"
          />
        </div>
      </div>

      {/* VIP Button */}
      <button
        onClick={() => router.push("/subscribe")}
        className="w-full mb-6 py-2 rounded bg-yellow-500 text-black font-semibold"
      >
        Subscribe to VIP
      </button>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Write something about yourself..."
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 resize-none"
        />
        <div className="text-xs text-right mt-1 text-gray-400">{bio.length}/150</div>
      </div>

      {/* Playlist */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Playlist (Spotify URL)</label>
        <input
          type="url"
          value={playlist}
          onChange={(e) => {
            setPlaylist(e.target.value);
            setHasChanges(true);
          }}
          placeholder="https://open.spotify.com/..."
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span>Public Profile</span>
          <Switch
            checked={publicProfile}
            onCheckedChange={() => {
              setPublicProfile(!publicProfile);
              setHasChanges(true);
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Go Anonymous</span>
          <Switch
            checked={anonymous}
            onCheckedChange={() => {
              setAnonymous(!anonymous);
              setHasChanges(true);
            }}
          />
        </div>
      </div>

      {/* Delete Button */}
      <button
        className="w-full py-2 rounded bg-red-600"
        onClick={() => console.log("Delete profile (not yet implemented)")}
      >
        Delete Profile
      </button>
    </div>
  );
}
