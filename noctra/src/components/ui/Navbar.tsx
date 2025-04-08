"use client";

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, Radar, Moon, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [value, setValue] = React.useState<string>("home");

  // Use useEffect to read from localStorage on component mount
  React.useEffect(() => {
    const storedValue = localStorage.getItem("activeTab");
    if (storedValue) {
      setValue(storedValue); // Set the value from localStorage if it exists
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem("activeTab", newValue); // Save the selected tab to localStorage
  };

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
