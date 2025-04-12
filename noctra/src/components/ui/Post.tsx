import React from "react";
import { Edit, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image"; // Importing the Image component from Next.js

interface PostProps {
  username: string;
  profilePicture: string;
  caption: string;
  media: File[]; // Media is now optional (empty array is valid)
  createdAt: string;
}

const Post: React.FC<PostProps> = ({ username, profilePicture, caption, media }) => {
  // Check if media exists and has at least one item
  const mediaUrl = media && media.length > 0 ? URL.createObjectURL(media[0]) : null;

  return (
    <div className="post-container bg-gray-900  text-white shadow-md rounded-lg p-4 mb-6 relative">
      {/* Edit icon button */}
      <div className="edit-icon absolute top-2 right-2">
        <button className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition duration-150 ease-in-out">
          <Edit className="text-gray-300" size={20} />
        </button>
      </div>

      {/* Header: Profile Picture and Username */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative w-12 h-12">
          <Image
            src={`${profilePicture}`}
            alt="Profile"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-lg font-semibold">{username}</p>
      </div>

      {/* Caption */}
      <p className="text-gray-300 mb-4">{caption}</p>

      {/* Media Thumbnail (only if media exists) */}
      {mediaUrl && (
        <div className="media-thumbnail mb-4">
          <Image
            src={mediaUrl}
            alt="Thumbnail"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Social Media Section */}
      <div className="social-media flex items-center space-x-6 mt-4">
        {/* Like Button */}
        <button className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition duration-150 ease-in-out">
          <Heart size={20} />
          <span>Like</span>
        </button>

        {/* Comment Button */}
        <button className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 transition duration-150 ease-in-out">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>

        {/* Share Button */}
        <button className="flex items-center space-x-2 text-gray-300 hover:text-green-500 transition duration-150 ease-in-out">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
