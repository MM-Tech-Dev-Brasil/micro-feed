import { API_BASE_URL } from '@/constants/endpoints';
import Cookies from 'js-cookie';
import axios from 'axios';

export const createLike = async (post_id: string) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/likes`,
      { post_id },
      { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
    );

    return data.data;
  } catch (err) {
    console.error('Error liking post', err);
  }
};

export const deleteLike = async (like_id: string) => {
  try {
    await axios.delete(
      `${API_BASE_URL}/likes/${like_id}`,
      { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
    );
  } catch (err) {
    console.error('Error deleting post', err);
  }
};
