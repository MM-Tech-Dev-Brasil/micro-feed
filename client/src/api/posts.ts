import { API_BASE_URL } from '@/constants/endpoints';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface IPost {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  like_by_current_user: string | null;
  liked_by_current_user: boolean;
  likes_count: number;
  username: string;
}

export const getAllPosts = async (page = 1, query = '') => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/posts`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      params: { page, query },
    });
    return data.data;
  } catch (err) {
    console.error('Error getting posts', err);
  }
};

export const getPostsByAuthorId = async (authorId: string, page = 1) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/posts/author/${authorId}`,
      {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        params: { page },
      }
    );
    return data.data;
  } catch (err) {
    console.error('Error getting posts', err);
  }
};

export const create = async (content: string) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/posts`,
      { content },
      { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
    );
    return data.data;
  } catch (err) {
    console.error('Error while creating post:', err);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    });
  } catch (err) {
    console.error('Error deleting post', err);
  }
};

export const editPost = async (postId: string, new_content: string) => {
  try {
    await axios.patch(
      `${API_BASE_URL}/posts/${postId}`,
      { new_content },
      { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
    );
  } catch (err) {
    console.error(`Error editing post`, err);
  }
};
