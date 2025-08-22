import { API_BASE_URL } from '@/constants/endpoints';
import axios from 'axios';

export const register = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      password,
    });
    return data;
  } catch (err) {
    console.error('Error while registering:', err);
  }
};
