"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Heart, MessageCircle, Ticket, X } from "lucide-react";
import ProtectedPage from "@/components/ProtectedPage"; // Import ProtectedPage


const stories = [
  { id: 1, profilePic: "/user1.jpg", video: "/story1.mp4" },
  { id: 2, profilePic: "/user2.jpg", video: "/story2.mp4" },
  { id: 3, profilePic: "/user3.jpg", video: "/story3.mp4" },
  { id: 4, profilePic: "/user4.jpg", video: "/story4.mp4" },
  { id: 5, profilePic: "/user5.jpg", video: "/story5.mp4" },
  { id: 6, profilePic: "/user6.jpg", video: "/story6.mp4" },
  { id: 7, profilePic: "/user7.jpg", video: "/story7.mp4" },
  { id: 8, profilePic: "/user8.jpg", video: "/story8.mp4" },
  { id: 9, profilePic: "/user9.jpg", video: "/story9.mp4" },
];

const initialPosts = [
  { id: 1, username: "dj_nightowl", profilePic: "/user1.jpg", media: "/post1.mp4", likes: 12, comments: ["🔥", "Love this!"] },
  { id: 2, username: "club_vibes", profilePic: "/user2.jpg", media: "/post2.jpg", likes: 24, comments: ["Epic night!"] },
  { id: 3, username: "partyqueen", profilePic: "/user3.jpg", media: "/post3.mp4", likes: 36, comments: ["🎉", "Party time!"] },
  { id: 4, username: "rave_mania", profilePic: "/user4.jpg", media: "/post4.jpg", likes: 48, comments: ["🎉", "Party time!"] },
  { id: 5, username: "midnightmoves", profilePic: "/user5.jpg", media: "/post5.mp4", likes: 60, comments: ["🎉", "Party time!"] },
  { id: 6, username: "nightlife_ninja", profilePic: "/user6.jpg", media: "/post6.mp4", likes: 72, comments: ["🎉", "Party time!"] }
];

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Infinite Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  const loadMorePosts = () => {
    const newPosts = posts.map((post) => ({
      ...post,
      id: post.id + posts.length,
    }));
    setPosts([...posts, ...newPosts]);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  const openComments = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
      setNewComment("");
    }
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-black text-white">
        {/* Top Bar */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-md z-50">
          <h1 className="text-2xl font-bold">Noctra</h1>
          <div className="flex gap-4">
            <button className="p-2 rounded-full bg-gray-800 flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              <span className="text-sm">My Tickets</span>
            </button>
            <button className="p-2 rounded-full bg-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Calendar</span>
            </button>
          </div>
        </header>

        {/* Stories */}
        <section className="mt-16 px-4 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-3">
          {stories.map((story) => (
            <div key={story.id} className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
              <video src={story.video} autoPlay loop muted className="w-full h-full object-cover" />
              <Image
                src={story.profilePic}
                alt="Profile"
                width={40}
                height={40}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-full border-2 border-white"
              />
            </div>
          ))}
        </section>

        {/* Feed */}
        <main className="px-4 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-3">
                <Image src={post.profilePic} alt="User" width={40} height={40} className="rounded-full" />
                <span className="text-sm font-medium">{post.username}</span>
              </div>

              {post.media.endsWith(".mp4") ? (
                <video src={post.media} autoPlay loop muted className="w-full h-auto object-cover" />
              ) : (
                <Image src={post.media} alt="Post" width={500} height={300} className="w-full h-auto object-cover" />
              )}

              <div className="flex items-center gap-4 p-3">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 text-gray-400 hover:text-white">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button onClick={() => openComments(post)} className="flex items-center gap-1 text-gray-400 hover:text-white">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments.length}</span>
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Comment Modal */}
        {showModal && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="bg-gray-900 p-6 rounded-lg w-80">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Comments</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-2">
                {selectedPost.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-300">• {comment}</p>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-gray-800 p-2 rounded-lg text-white text-sm"
                  placeholder="Add a comment..."
                />
                <button onClick={addComment} className="bg-gray-700 px-3 py-2 rounded-lg text-white text-sm">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
