import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PostComponent } from "./post";
import { PostComposer } from "./postComposer";
import { Post, usePosts } from "@/hooks/usePosts";
import { useLikes } from "@/hooks/useLikes";
import { useAuth } from "@/hooks/useAuth";
interface FeedProps {
  posts: Post[]; 
}

export function Feed({ posts: initialPosts }: FeedProps) {
  const {currentUser} = useAuth()
  const {editPost, deletePost}=usePosts()
  const user = currentUser()
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const { toggleLike, loading, error } = useLikes();

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const handlePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      userId: "currentUser",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0,
      isLikedByCurrentUser: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedPost = await toggleLike(post);
    setPosts(posts.map(p => p.id === postId ? updatedPost : p));
  };

const handleEdit = async (postId: string, newContent: string) => {
  console.log("Editing post:", postId); 
  try {
    await editPost(postId, newContent); 
    window.location.reload();
  } catch (err) {
    console.error("Error updating post:", err);
    window.location.reload(); 
  }
};

  const handleDelete = async (postId: string) => {
    console.log("Editing post:", postId); 
    try {
      await deletePost(postId); 
      window.location.reload();
  } catch (err) {
    console.error("Error updating post:", err);
    window.location.reload(); 
  }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === "mine" && post.userId !== user?.sub) return false;
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase()))
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
        {filteredPosts.map(post => (
          <PostComponent
            key={post.id}
            post={post}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isUserPost={post.userId === user?.sub}
          />
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-neutral-500 mt-8">No posts found.</p>
        )}
      </div>
    </div>
  );
}

