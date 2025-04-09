// components/ui/ProfileTopBar.tsx

"use client";

import { Fragment } from "react";
import { Menu as HMenu, Transition } from "@headlessui/react";
import { Menu, CopyPlus } from "lucide-react";
import { IconButton } from "@mui/material";
import clsx from "clsx";

interface ProfileTopBarProps {
  onMenuClick: () => void;
}

const ProfileTopBar: React.FC<ProfileTopBarProps> = ({ onMenuClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-md z-50 shadow-md relative">
      {/* Left Side: Upload Dropdown Menu */}
      <HMenu as="div" className="relative inline-block text-left">
        <HMenu.Button as={IconButton}>
          <CopyPlus className="w-6 h-6 text-white" />
        </HMenu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <HMenu.Items className="absolute left-0 mt-2 w-40 origin-top-left bg-black/80 backdrop-blur-md divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1">
              {["Add Post", "Add Story", "Add Event"].map((option) => (
                <HMenu.Item key={option}>
                  {({ active }) => (
                    <button
                      onClick={() => alert(`${option} clicked`)} // Replace with real logic
                      className={clsx(
                        "w-full text-left px-3 py-2 text-sm rounded-md",
                        active ? "bg-white-100 text-white-900" : "text-white-700"
                      )}
                    >
                      {option}
                    </button>
                  )}
                </HMenu.Item>
              ))}
            </div>
          </HMenu.Items>
        </Transition>
      </HMenu>

      {/* Center: Title */}
      <h1 className="text-xl font-semibold text-center text-white flex-1">Profile</h1>

      {/* Right Side: Menu Icon Button */}
      <IconButton onClick={onMenuClick}>
        <Menu className="w-6 h-6 text-white" />
      </IconButton>
    </div>
  );
};

export default ProfileTopBar;
