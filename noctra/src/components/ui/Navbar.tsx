"use client";

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, Radar, Moon, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [value, setValue] = React.useState<string>("home");
  const [isClient, setIsClient] = React.useState<boolean>(false); // State to track if the component is mounted

  // Use useEffect to check if the component is mounted
  React.useEffect(() => {
    setIsClient(true); // Set to true once mounted
    const storedValue = localStorage.getItem("activeTab");
    if (storedValue) {
      setValue(storedValue); // Set the value from localStorage if it exists
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem("activeTab", newValue); // Save the selected tab to localStorage
  };

  if (!isClient) {
    return null; // Prevent rendering the component during SSR
  }

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        height: "70px",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        borderTop: "1px solid #444", // Border color similar to your original
        zIndex: 9999,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<Home className="w-6 h-6" style={{ color: "white" }} />}
        component={Link}
        href="/"
        sx={{
          color: 'white', 
          '&.Mui-selected': { color: 'white' } // Ensures active label is also white
        }}
      />
      <BottomNavigationAction
        label="Radar"
        value="radar"
        icon={<Radar className="w-6 h-6" style={{ color: "white" }} />}
        component={Link}
        href="/radar"
        sx={{
          color: 'white', 
          '&.Mui-selected': { color: 'white' }
        }}
      />
      <BottomNavigationAction
        label="Night Life"
        value="nightlife"
        icon={<Moon className="w-6 h-6" style={{ color: "white" }} />}
        component={Link}
        href="/nightlife"
        sx={{
          color: 'white', 
          '&.Mui-selected': { color: 'white' }
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<User className="w-6 h-6" style={{ color: "white" }} />}
        component={Link}
        href="/profile"
        sx={{
          color: 'white', 
          '&.Mui-selected': { color: 'white' }
        }}
      />
    </BottomNavigation>
  );
}
