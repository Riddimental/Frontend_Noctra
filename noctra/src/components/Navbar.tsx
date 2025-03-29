import Link from "next/link";
import { Moon, Radar, Home, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black z-[9999] text-white flex justify-around py-4 border-t border-gray-800">
      <Link href="/" className="flex flex-col items-center">
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/radar" className="flex flex-col items-center">
        <Radar className="w-6 h-6" />
        <span className="text-xs">Radar</span>
      </Link>
      <Link href="/nightlife" className="flex flex-col items-center">
        <Moon className="w-6 h-6" />
        <span className="text-xs">Night Life</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <User className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}
