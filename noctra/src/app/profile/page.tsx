"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Crown, Edit, LogOut, Settings, LifeBuoy, BriefcaseBusiness } from "lucide-react";
import { getProfile } from "@/api/service";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import ProfileTopBar from "@/components/ui/ProfileTopBar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState<{
    username: string;
    cover_pic_url: string;
    profile_pic_url: string;
    bio: string;
    is_vip: boolean;
    date_of_birth: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer visibility
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, [profile, router]);
  

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/auth");
  };

  const handleEdit = () => {
    router.push("/edit_profile");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Prepend base URL to the image paths
  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Top Bar: Replace the existing code with ProfileTopBar */}
      <ProfileTopBar onMenuClick={toggleDrawer}/>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1a202c", // Dark background color
            color: "#fff", // White text color
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  padding: "10px 0",
                  textAlign: "center",
                }}
              >
                Noctra
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleEdit}>
                <ListItemIcon>
                  <Edit className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => console.log("click")}>
                <ListItemIcon>
                  <Crown className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Subscription" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => console.log("click")}>
                <ListItemIcon>
                  <BriefcaseBusiness className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Bar Manager" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Settings className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LifeBuoy className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Contact Support" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          {/* Logout Button on the bottom of the box*/}
          <List sx={{ position: "absolute", bottom: 80, width: "100%" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogOut className="w-6 h-6" style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
              className="w-24 h-24 object-cover rounded-full border-4 border-black"
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
