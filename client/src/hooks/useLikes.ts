import { useState } from "react";
import axios from "axios";
import { Post } from "@/hooks/usePosts";

interface UseLikesReturn {
  toggleLike: (post: Post) => Promise<Post>;
  loading: boolean;
  error: string | null;
}

export function useLikes(): UseLikesReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async (post: Post): Promise<Post> => {
    console.log("toggleLike called for post:", post.id, "isLiked:", post.isLikedByCurrentUser);
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      setError("Usuário não autenticado");
      setLoading(false);
      return post;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const updatedPost: Post = { ...post };

    try {
      if (post.isLikedByCurrentUser) {
        console.log("Unliking post:", post.id);
        const response = await axios.delete(`http://localhost:8080/likes/${post.id}`, config);
        console.log("DELETE response:", response.data);

        updatedPost.likesCount = Math.max(0, post.likesCount - 1);
        updatedPost.isLikedByCurrentUser = false;
      } else {
        console.log("Liking post:", post.id);
        const response = await axios.post(
          `http://localhost:8080/likes`,
          { post_id: post.id },
          config
        );
        console.log("POST response:", response.data);

        updatedPost.likesCount = post.likesCount + 1;
        updatedPost.isLikedByCurrentUser = true;
      }

      console.log("Updated post:", updatedPost);
      return updatedPost;
    } catch (err: any) {
      console.error("Error toggling like:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Erro ao curtir/descurtir post");
      return post;
    } finally {
      setLoading(false);
      console.log("toggleLike finished for post:", post.id);
    }
  };

  return { toggleLike, loading, error };
}
