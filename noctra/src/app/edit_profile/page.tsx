"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { getProfile, updateProfile } from "@/api/service";
import { ArrowLeft, Save } from "lucide-react";
import ClubCreationDrawer from "@/components/ui/ClubCreationDrawer";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);



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
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 bg-black z-10 px-4 py-4 border-b border-gray-800 flex justify-between items-center">
        <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => router.push("/profile")} />
        <h1 className="text-lg font-semibold text-center flex-1">Edit Profile</h1>
        <button
          className={`flex items-center gap-1 text-sm ${!hasChanges ? "opacity-40 cursor-not-allowed" : "text-yellow-400"}`}
          onClick={handleSaveChanges}
          disabled={!hasChanges}
        >
          <Save className="w-5 h-5" />
          Save
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        {/* Profile Header */}
        <div className="space-y-4">
          {/* Cover */}
          <div className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer" onClick={() => document.getElementById("coverPicInput")?.click()}>
            {coverPicUrl && (
              <Image src={`${baseUrl}${coverPicUrl}`} alt="Cover" fill className="object-cover" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-sm">Edit Cover</div>
            <input id="coverPicInput" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setCoverPic)} />
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white cursor-pointer" onClick={() => document.getElementById("profilePicInput")?.click()}>
              {profilePicUrl && (
                <Image src={`${baseUrl}${profilePicUrl}`} alt="Profile" fill className="object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-xs">Edit</div>
            </div>
            <input id="profilePicInput" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePic)} />
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          {/* Bio */}
          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Write something about yourself..."
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 resize-none"
            />
            <div className="text-xs text-right mt-1 text-gray-400">{bio.length}/150</div>
          </div>

          {/* Playlist */}
          <div>
            <label className="block text-sm mb-1">Playlist (Spotify URL)</label>
            <input
              type="url"
              value={playlist}
              onChange={(e) => {
                setPlaylist(e.target.value);
                setHasChanges(true);
              }}
              placeholder="https://open.spotify.com/..."
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="border-t border-gray-800 pt-6 space-y-4">
          <div className="flex justify-between items-center ">
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

        {/* Actions */}
        <div className="max-w-[300px] mx-auto space-y-3 pt-6" style={{ marginBottom: '70px' }}>
          <button
            onClick={() => router.push("/subscribe")}
            className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            Subscribe to VIP
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            Create Club
          </button>
          <ClubCreationDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          <button
            className="w-full py-3 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
            onClick={() => console.log("Delete profile (not yet implemented)")}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>

  );
}
