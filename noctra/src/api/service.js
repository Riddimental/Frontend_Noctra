import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';
const MEDIA_URL = 'http://127.0.0.1:8000';

const api = axios.create({
   baseURL: BASE_URL,
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

export const getBaseUrl = () => {
   return BASE_URL
}

export const getMediaURL = () => {
   return MEDIA_URL
}

export async function registerUser(username, email, password, date_of_birth) {
   try {
     const response = await api.post('/register/', {
       username,
       email,
       password,
       date_of_birth
     });

     // Return response data directly (Axios does not use response.ok)
     return response.data;
   } catch (error) {
     console.error("API Error:", error.response?.data || error.message);
     return null;
   }
}


 //save user profile data in localstorage as a response
export const saveProfileData = (profileData) => {
   localStorage.setItem('profileData', JSON.stringify(profileData));
   console.log('Profile data saved to localstorage');
};

// Get user profile if not found in localstorage as profileData
export const getProfile = async (access_token) => {
   if (localStorage.getItem('profileData')) {
      console.log('Profile data found in memory');
      return JSON.parse(localStorage.getItem('profileData'));
   } else {
      try {
         const response = await api.get('/userprofiles/me/', {
            headers: {
               'Authorization': `Token ${access_token}`,
            },
         });
         saveProfileData(response.data);
         console.log('Profile data fetched from api');
         return response.data;
      } catch (error) {
         console.error('Error fetching profile:', error.response?.data || error.message);
         throw new Error('Failed to fetch profile');
      }
   }
};

export const getUserBasicInfoByID = async (id) => {
   try {
      const response = await api.get(`/userprofiles/${id}/`);
      return response.data;
   } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      throw new Error('Failed to fetch user');
   }
   
}

// Function to upload a new post with media files
export async function uploadPostWithMedia(caption, tags, is_public, files, access_token, original_post_id = null) {
   try {
     const formData = new FormData();
 
     const formattedTags = tags.map(tag =>
       typeof tag === 'string' ? { name: tag } : tag
     );
 
     formData.append('caption', caption);
     formData.append('tags', JSON.stringify(formattedTags));
     formData.append('is_public', is_public ? 'true' : 'false');
 
     // Append original_post if it's provided (for reposts)
     if (original_post_id) {
       formData.append('original_post', original_post_id);
     }
 
     if (files && files.length > 0) {
       for (const file of files) {
         formData.append('media', file);
       }
     }
 
     const response = await api.post('/posts/', formData, {
       headers: {
         'Authorization': `Token ${access_token}`,
         'Content-Type': 'multipart/form-data',
       },
     });
 
     console.log('✅ Post and media uploaded successfully');
     return response.data;
   } catch (error) {
     console.error('❌ Error uploading post and media:', error.response?.data || error.message);
     throw new Error('Post and media upload failed');
   }
}

export async function getPostsByUser(access_token) {
   try {
     const response = await api.get('/posts/', {
       headers: {
         'Authorization': `Token ${access_token}`,
       },
     });
 
     //console.log('✅ User posts:', response.data);
     return response.data;
   } catch (error) {
     console.error('❌ Error fetching user posts:', error.response?.data || error.message);
     throw new Error('Failed to fetch user posts');
   }
 }
 

//update user profile
export async function updateProfile(data, token) {
   try {
     const response = await api.patch("/userprofiles/me/", data, {
       headers: {
         Authorization: `Token ${token}`,
         "Content-Type": "multipart/form-data",
       },
     });
     //remove the stored profile in local sotrage
     localStorage.removeItem('profileData')
     return response.data;
   } catch (error) {
     if (error.response?.data?.detail) {
       throw new Error(error.response.data.detail);
     }
     throw new Error("Failed to update profile");
   }
 }
 

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
