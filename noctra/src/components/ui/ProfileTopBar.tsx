// components/ui/ProfileTopBar.tsx

import { Menu, Upload } from "lucide-react"; // Import the required icons from lucide-react
import { IconButton } from "@mui/material";

interface ProfileTopBarProps {
  onMenuClick: () => void;
  onUploadClick: () => void;
}

const ProfileTopBar: React.FC<ProfileTopBarProps> = ({ onMenuClick, onUploadClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 shadow-md">
      {/* Left Side: Upload Icon Button */}
      <IconButton onClick={onUploadClick}>
        <Upload className="w-6 h-6 text-white" />
      </IconButton>

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
