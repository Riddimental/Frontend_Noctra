# Noctra Frontend - README

Noctra is a modern social media platform developed with **Next.js** using TypeScript. It provides a dynamic and responsive user interface for managing profiles, creating posts, and interacting with media. This README covers the frontend setup, installation, and usage instructions for **Windows**, **Linux**, and **macOS**.

## Features

- User registration and authentication (JWT-based)
- Viewing and creating posts
- Uploading media (images, videos, documents)
- Profile management (view and update)
- Responsive design optimized for both mobile and desktop

## Technologies Used

- **Frontend**: Next.js (React framework)
- **UI Components**: Tailwind CSS
- **Authentication**: JWT (JSON Web Token)
- **State Management**: React Context API or Redux (based on implementation)
- **API Interaction**: Axios or Fetch API
- **Font**: Google Fonts (Geist)

## Prerequisites

Before setting up the frontend, ensure that the following are installed:

- **Node.js** (v14 or higher)
- **Yarn** or **npm** (for managing packages)
- **Next.js** (v12 or higher, typically handled by Next.js)

## Setup Instructions

### 1. Clone the Repository

Clone the Noctra frontend repository to your local machine:

```bash
git clone https://github.com/Riddimental/Frontend_Noctra.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

Using npm:
```bash
cd noctra
npm install
```

Using Yarn:
```bash
cd noctra
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project directory to store the environment variables. This file includes the API URL for backend interactions:

```bash
touch .env.local
```

Add the following content to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Make sure to replace the URL with the correct endpoint for your backend (e.g., `http://127.0.0.1:8000/api` for local development or your deployed URL).

### 4. Auth Token for API Requests

For any API request, you need to authenticate by passing a **JWT token** in the request header. Ensure you include the token when interacting with protected endpoints.

**Example**:  
Use **Axios** or **Fetch** to include the token in request headers:

```javascript
axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
  headers: {
    Authorization: `Bearer ${yourAuthToken}`
  }
})
```

### 5. Running the Development Server

Start the development server:

Using npm:
```bash
npm run dev
```

Using Yarn:
```bash
yarn dev
```

This will start the frontend on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to see the application in action.

### 6. API Integration

The frontend interacts with the backend through RESTful API calls. The API requests are made using **Axios** or **Fetch API**. Ensure you include the JWT token in the header for authenticated requests.

### 7. Deployment

To deploy the frontend for production:

Build the production version of the application:

Using npm:
```bash
npm run build
```

Using Yarn:
```bash
yarn build
```

Once the build is complete, deploy the frontend to platforms like **Vercel**, **Netlify**, or any other platform supporting Next.js deployments.

### 8. Styling

Noctra uses **Tailwind CSS** for styling. The utility-first CSS framework makes it easy to customize the design. You can adjust the theme and styles in the `tailwind.config.js` file or directly within the component files using Tailwind's utility classes.

### 9. Troubleshooting

If you encounter any issues during the setup or while running the frontend, here are some steps to troubleshoot:

- Ensure your backend is running and accessible.
- Double-check the API URL in `.env.local`.
- Make sure you have a valid JWT token when making API requests.
- If you encounter errors during the build, try clearing the cache and reinstalling dependencies:
  ```bash
  rm -rf node_modules
  npm install
  ```



## For Frontend Development - Windows, Linux, and macOS Instructions

The setup process is consistent across **Windows**, **Linux**, and **macOS**. Below are instructions specific to each platform.

### **Windows**

1. Install **Node.js**: [Download Node.js](https://nodejs.org/)
2. Install **Git**: [Download Git for Windows](https://git-scm.com/download/win)
3. Use **Command Prompt** or **PowerShell** to run the setup commands.

### **Linux**

1. Install **Node.js** using package managers (e.g., `sudo apt install nodejs`).
2. Install **Git** using:
   ```bash
   sudo apt install git
   ```
3. Use the terminal to navigate and run setup commands.

### **macOS**

1. Install **Node.js** using Homebrew:
   ```bash
   brew install node
   ```
2. Install **Git** using Homebrew:
   ```bash
   brew install git
   ```
3. Use **Terminal** to run the setup commands.



## Screenshots

Below are screenshots of the Noctra frontend UI to give you a visual overview of the user experience:

### 1. Register Page
First register a user providing username, email, date of birth, password and user's agreement
![Register Screenshot](./screenshots/1%20register.png)



### 2. Login Page  
Have access to secure login screen with fields for email and password. Authenticates the user using JWT.  
![Login Screenshot](./screenshots/2%20login.png)



### 3. Profile Home  
The user is routed to the user's profile home showing their avatar, username, and a list of their recent posts.  
![Profile Home Screenshot](./screenshots/3%20profile%20home.png)



### 4. Add Post  
Click in "Add Post" to create a new post, including a caption and the option to upload media like images or videos.  
![Add Post Screenshot](./screenshots/4%20add%20post.png)



### 5. Profile Options  
Drawer menu with options available for editing the profile info, Manage VIP subscription, Bar manager, App settings, Contact support and Logout.  
![Options Screenshot](./screenshots/5%20options.png)



### 6. Edit Profile  
Ready for updating user profile information such as display name, bio, or profile picture.  
![Edit Profile Screenshot](./screenshots/6%20edit%20profile.png)



### 7. Night Radar View  
See a unique nighttime radar-style UI view, part of Noctra's experimental design features.  
![Night Radar Screenshot](./screenshots/7%20nigth%20radar.png)



## Backend

The backend for Noctra is available in a separate repository and handles authentication, media storage, post management, and all API endpoints consumed by the frontend.

**Repository**: [Backend_Noctra](https://github.com/Riddimental/Backend_Noctra.git)

Make sure to set up and run the backend server to enable full functionality of the Noctra platform. Refer to the backend repository's README for detailed installation and configuration instructions.



## License

This project is licensed under the [Proprietary License](LICENSE) - all rights reserved. This project is an independent work and is not affiliated with any institution.

