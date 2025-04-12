"use client";

import { Bell, MessageCircle } from "lucide-react";

interface NightlifeTopBarProps {
  onNotificationClick: () => void;
}

export default function NightlifeTopBar({ onNotificationClick }: NightlifeTopBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-5 py-4 bg-black/30 backdrop-blur-md z-50">
      <h1 className="text-2xl font-bold">Night Life</h1>
      <div className="flex gap-4">
        <button className="p-2 rounded-full bg-gray-800">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          onClick={onNotificationClick} // Open the Notification Drawer
          className="p-2 rounded-full bg-gray-800"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
