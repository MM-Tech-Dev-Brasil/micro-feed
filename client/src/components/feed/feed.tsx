"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Post } from "./post";
import { PostComposer } from "./postComposer";

export function Feed() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "user1",
      content: "This is a great day to learn React!",
      likes: 10,
      timestamp: "1h ago",
    },
    {
      id: 2,
      username: "currentUser",
      content: "I am building a Twitter clone with Gemini!",
      likes: 5,
      timestamp: "2h ago",
    },
    {
      id: 3,
      username: "user2",
      content: "Tailwind CSS makes styling so easy.",
      likes: 25,
      timestamp: "3h ago",
    },
    {
      id: 4,
      username: "devguy",
      content: "Next.js 15 is a game changer 🔥",
      likes: 42,
      timestamp: "30m ago",
    },
    {
      id: 5,
      username: "frontendqueen",
      content: "Dark mode should be default everywhere.",
      likes: 67,
      timestamp: "10m ago",
    },
    {
      id: 6,
      username: "coder123",
      content: "Just deployed my app on Vercel 🚀",
      likes: 19,
      timestamp: "45m ago",
    },
    {
      id: 7,
      username: "designerlife",
      content: "UI is not just how it looks, it’s how it works.",
      likes: 33,
      timestamp: "5h ago",
    },
    {
      id: 8,
      username: "techguru",
      content: "AI tools are boosting productivity like crazy!",
      likes: 54,
      timestamp: "6h ago",
    },
    {
      id: 9,
      username: "currentUser",
      content: "Refactoring my code and loving the clarity ✨",
      likes: 8,
      timestamp: "2h ago",
    },
    {
      id: 10,
      username: "openai_fan",
      content: "ChatGPT just saved me hours of debugging.",
      likes: 76,
      timestamp: "7h ago",
    },
    {
      id: 11,
      username: "js_master",
      content: "JavaScript will never die 💛",
      likes: 90,
      timestamp: "8h ago",
    },
    {
      id: 12,
      username: "newbie",
      content: "Finally understood closures today 😭",
      likes: 21,
      timestamp: "9h ago",
    },
    {
      id: 13,
      username: "devops_pro",
      content: "Docker + Kubernetes = unstoppable combo",
      likes: 38,
      timestamp: "12h ago",
    },
    {
      id: 14,
      username: "react_lover",
      content: "React hooks simplified my entire project.",
      likes: 64,
      timestamp: "1d ago",
    },
    {
      id: 15,
      username: "sql_ninja",
      content: "PostgreSQL queries can be beautiful.",
      likes: 29,
      timestamp: "2d ago",
    },
    {
      id: 16,
      username: "currentUser",
      content: "Experimenting with Prisma ORM today.",
      likes: 12,
      timestamp: "3d ago",
    },
    {
      id: 17,
      username: "ai_dev",
      content: "AI won’t take your job, but someone using AI will.",
      likes: 110,
      timestamp: "4d ago",
    },
    {
      id: 18,
      username: "linuxlover",
      content: "Ubuntu + VSCode = happiness.",
      likes: 47,
      timestamp: "5d ago",
    },
    {
      id: 19,
      username: "pythonista",
      content: "Python is still the king of data science 🐍",
      likes: 82,
      timestamp: "6d ago",
    },
    {
      id: 20,
      username: "gamerdev",
      content: "Building a game in React Three Fiber 🎮",
      likes: 50,
      timestamp: "1w ago",
    },
  ]);

  const handlePost = (content: string) => {
    const newPost = {
      id: Date.now(),
      username: "currentUser",
      content,
      likes: 0,
      timestamp: "now",
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleEdit = (postId: number) => {
    console.log(`Editing post ${postId}`);
  };

  const handleDelete = (postId: number) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "mine" && post.username !== "currentUser") return false;
    if (
      searchQuery &&
      !post.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
 <div className="max-w-xl mx-auto p-4 pt-28">
    <div className="fixed top-20 left-0 right-0 flex justify-center z-50">
    <div className="w-full max-w-xl px-4">
      <PostComposer onPost={handlePost} />
    </div>
  </div>
    <div className="mb-4 mt-25">
    <Input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="mt-4 space-y-4">
    {filteredPosts.map((post) => (
      <Post
        key={post.id}
        post={post}
        onLike={handleLike}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isUserPost={post.username === "currentUser"}
      />
    ))}
    {filteredPosts.length === 0 && (
      <p className="text-center text-neutral-500 mt-8">No posts found.</p>
    )}
  </div>
</div>

  );
}
