"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { getProfile, getBaseUrl, updateProfile } from "@/api/service";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();

  // State variables
  const [bio, setBio] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [publicProfile, setPublicProfile] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");
  const [coverPicUrl, setCoverPicUrl] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false); // Track if any field has changed

  // Load profile data
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
      setHasChanges(true); // Mark as changed
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 150) {
      setBio(e.target.value);
      setHasChanges(true); // Mark as changed
    }
  };

  const baseUrl = 'http://127.0.0.1:8000';


  const handleSaveChanges = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return router.push("/auth");
  
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("playlist", playlist);
    formData.append("publicProfile", publicProfile.toString());
    formData.append("anonymous", anonymous.toString());
  
    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }
  
    if (coverPic) {
      formData.append("cover_pic", coverPic);
    }
  
    try {
      const updatedProfile = await updateProfile(formData, token);
      console.log("Profile updated:", updatedProfile);
      setHasChanges(false);
      router.push("/profile"); // Optional: go back after saving
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    }
  };
  

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4 relative">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer absolute left-0"
          onClick={() => router.push("/profile")} // Navigate back to profile
        />
        <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Edit Profile
        </h1>
        <button
          className={`flex items-center text-white ${!hasChanges && "opacity-50 cursor-not-allowed"} absolute right-0`}
          onClick={handleSaveChanges}
          disabled={!hasChanges}
        >
          <Save className="w-6 h-6" />
          Save
        </button>
      </div>


      {/* Profile Picture Upload */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium">Profile Picture</label>
        <div
          className="w-24 h-24 rounded-full mb-2 relative cursor-pointer"
          onClick={() => document.getElementById("profilePicInput")?.click()}
        >
          {profilePicUrl && (
            <Image
              src={`${baseUrl}${profilePicUrl}`}
              alt="Profile"
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-full"
              priority
            />
          )}
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-50 bg-black rounded-full">
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

      {/* Cover Picture Upload */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium">Cover Picture</label>
        <div
          className="w-full h-40 mb-2 relative cursor-pointer"
          onClick={() => document.getElementById("coverPicInput")?.click()}
        >
          {coverPicUrl && (
            <Image
              src={`${baseUrl}${coverPicUrl}`}
              alt="Cover"
              width={800}
              height={300}
              className="w-full h-40 object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-50 bg-black">
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

      {/* Subscribe to VIP */}
      <button
        className="p-2 bg-yellow-500 rounded w-full mb-4"
        onClick={() => router.push("/subscribe")}
      >
        Subscribe to VIP
      </button>

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
          <span
            className={`absolute bottom-2 right-2 text-xs ${bio.length === 150 ? "text-red-500" : "text-gray-400"}`}
          >
            {bio.length}/150
          </span>
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
        <Switch
          checked={publicProfile}
          onCheckedChange={() => {
            setPublicProfile(!publicProfile);
            console.log(publicProfile ? "Private" : "Public");
            setHasChanges(true);
          }}
        />
      </div>

      {/* Anonymous Mode Toggle */}
      <div className="mb-4 flex justify-between items-center">
        <span>Go Anonymous</span>
        <Switch
          checked={anonymous}
          onCheckedChange={() => {
            setAnonymous(!anonymous);
            console.log(anonymous ? "Sharing" : "Hiding");
            setHasChanges(true);
          }}
        />
      </div>

      {/* Delete Profile */}
      <button
        className="p-2 bg-red-600 rounded w-full"
        onClick={() => console.log("Profile deleted (implement API call)")}
      >
        Delete Profile
      </button>
    </div>
  );
}
