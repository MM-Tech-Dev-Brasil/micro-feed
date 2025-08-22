import { useApi } from './useApi';
import { useAuth } from './useAuth';
import axios, { InternalAxiosRequestConfig } from 'axios';

export interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isLikedByCurrentUser: boolean;
  likesCount: number;
}

interface GetPostsResponse {
  message: string;
  data: {
    id: string;
    author_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    isLikedByCurrentUser: boolean;
    likesCount: number;
  }[];
}

export function usePosts() {
  const token = localStorage.getItem('token');

  async function createPost(content: string) {
    try {
      const { data } = await axios.post<Post>(
        'http://localhost:8080/posts',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (err) {
      console.error('Error while creating post:', err);
    }
  }

  async function getPosts(
    query?: string,
    options?: { page?: number; limit?: number; mine?: boolean }
  ): Promise<Post[] | null> {
    try {
      const params: any = { query };

      if (!options?.mine) {
        params.page = options?.page || 1;
        params.limit = options?.limit || 10;
      }
      const { data } = await axios.get<GetPostsResponse>(
        'http://localhost:8080/posts',
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );

      const posts: Post[] = data.data.map((p) => ({
        id: p.id,
        content: p.content,
        userId: p.author_id,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        isLikedByCurrentUser: p.isLikedByCurrentUser,
        likesCount: p.likesCount,
      }));

      return posts;
    } catch (err) {
      console.error('Error while fetching posts:', err);
      return null;
    }
  }

  async function getPostsByAuthor(
    authorId: string,
    options?: { page?: number; limit?: number }
  ): Promise<Post[] | null> {
    try {
      const params: any = {
        page: options?.page || 1,
        limit: options?.limit || 10,
      };

      const { data } = await axios.get<GetPostsResponse>(
        `http://localhost:8080/posts/author/${authorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );

      const posts: Post[] = data.data.map((p) => ({
        id: p.id,
        content: p.content,
        userId: p.author_id,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        isLikedByCurrentUser: p.isLikedByCurrentUser,
        likesCount: p.likesCount,
      }));

      return posts;
    } catch (err) {
      console.error(`Error while fetching posts by author ${authorId}:`, err);
      return null;
    }
  }
  async function editPost(postId: string, newContent: string): Promise<void> {
    try {
      const { data } = await axios.patch<{ message: string; data: Post }>(
        `http://localhost:8080/posts/${postId}`,
        { new_content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.reload();
    } catch (err) {
      console.error(`Error editing post ${postId}:`, err);
    }
  }
  async function deletePost(postId: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error(`Error deleting post ${postId}:`, err);
    }
  }

  return { createPost, getPosts, getPostsByAuthor, editPost, deletePost };
}
