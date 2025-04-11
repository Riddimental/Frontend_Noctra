Here is the `README.md` for the frontend part of your Noctra project:

```markdown
# Noctra Frontend

Noctra is a modern social media platform built with **Next.js** in typescript. It provides a dynamic and responsive interface for users to interact with the application, manage their profiles, create posts, and upload media. This README provides an overview of the frontend setup, installation, and running instructions.

## Features
- User registration and authentication (JWT)
- View and create posts
- Upload media (images, videos, documents)
- Edit user profile
- Responsive design optimized for mobile and desktop devices

## Technologies Used
- **Frontend**: Next.js (React framework)
- **UI Components**: Tailwind CSS
- **Authentication**: JWT (JSON Web Token)
- **State Management**: React Context API or Redux (depending on implementation)
- **API Interaction**: Axios or Fetch API for handling HTTP requests
- **Font**: Google Fonts (Geist)

## Getting Started

### Prerequisites
Before setting up the frontend, ensure that you have the following installed:
- **Node.js** (v14 or higher)
- **Yarn** or **npm** (for managing packages)
- **Next.js** (v12 or higher, but typically Next.js handles its own dependencies)

### Setup

#### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Riddimental/Frontend_Noctra.git
```

#### 2. Frontend Setup

Navigate to the frontend directory and install the dependencies:

```bash
cd noctra
npm install
```

or if you prefer using Yarn:

```bash
cd noctra
yarn install
```

#### 3. Environment Variables

Create a `.env.local` file at the root of your frontend directory to store environment variables. This file will include the base URL of your backend and any other necessary environment-specific settings:

```bash
touch .env.local
```

```env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

This is the URL of your backend API. Make sure to update it based on where your backend is hosted (e.g., `http://127.0.0.1:8000/api` for local development).

#### 4. Running the Development Server

Now, you can start the development server:

```bash
npm run dev
```

or with Yarn:

```bash
yarn dev
```

This will start the frontend on `http://localhost:3000`. You can open this URL in your browser to see the app in action.

### API Integration

The frontend interacts with the backend using RESTful API calls, primarily through the use of **Axios** or **Fetch**.

### Deployment

Once you're ready to deploy the frontend, you can build the production version of the application using:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

This will optimize and bundle the application for production. You can then deploy the frontend to platforms such as Vercel, Netlify, or any other platform that supports Next.js deployment.

### Styling

The frontend uses **Tailwind CSS** for styling, providing a utility-first CSS framework. You can customize the design by editing the `tailwind.config.js` file or adding custom styles directly into the component files.

### Licenses

This project is licensed under the MIT License - see the LICENSE file for details.