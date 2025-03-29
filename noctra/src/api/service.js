import axios from 'axios';
import { randomInt } from 'crypto';

const api = axios.create({
   baseURL: 'http://127.0.0.1:8000/api/',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Login - Get authentication token
export const getToken = (username, password) => {
   return api.post('/token/', {
      username,
      password,
   });
};

export async function registerUser(username, email, password) {
   try {
     const response = await fetch("http://127.0.0.1:8000/api/register/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ username, email, password }),
     });
 
     if (!response.ok) {
       throw new Error(`Error ${response.status}: ${response.statusText}`);
     }
 
     return await response.json(); // Expecting { token: "...", username: "..." }
   } catch (error) {
     console.error("API Error:", error);
     return null;
   }
 }
 

// Get user profile
export const getProfile = async (access_token) => {
   try {
      const response = await api.get('/userprofiles/me/', {
         headers: {
            'Authorization': `Token ${access_token}`,
         },
      });
      return response;
   } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error.message);
      throw new Error('Failed to fetch profile');
   }
};

// Update user profile
export const updateProfile = async (access_token, profileData) => {
   try {
      const response = await api.put('/userprofiles/me/', profileData, {
         headers: {
            'Authorization': `Token ${access_token}`,
         },
      });
      return response;
   } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      throw new Error('Failed to update profile');
   }
};

// Logout user (invalidate token)
export const logoutUser = async (access_token) => {
   try {
      await api.post('/logout/', {}, {
         headers: {
            'Authorization': `Token ${access_token}`,
         },
      });
      console.log('Logout successful');
      localStorage.clear()
   } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      throw new Error('Logout failed');
   }
};
