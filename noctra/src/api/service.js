import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

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
   return BASE_URL;
}

export async function registerUser(username, email, password) {
   try {
     const response = await api.post('/register/', {
       username,
       email,
       password
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
      console.log('Profile data found in memory:', JSON.parse(localStorage.getItem('profileData')));
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



// Update user profile
export const updateProfile = async (access_token, profileData) => {
   try {
      const response = await api.put('/userprofiles/me/', profileData, {
         headers: {
            'Authorization': `Token ${access_token}`,
         },
      });
      return response.data;
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
