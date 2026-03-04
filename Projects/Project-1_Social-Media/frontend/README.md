📱 Social Media App :-

A full-stack social media web application where users can register, log in, follow other users, and create posts.

Deployed with:


Frontend → Vercel
Backend → Render
Database → MongoDB

🚀 Live Demo


🔗 Frontend: https://app-socialmedia-app.vercel.app
🔗 Backend API: https://socialmedia-60s2.onrender.com

✨ Features


🔐 User Authentication (Register / Login)
👤 User Profiles
➕ Follow / Unfollow Users
📊 Followers & Following Count
📝 Create & View Posts
📰 Feed (Latest Posts First)
🔒 Protected Routes
🌐 CORS Configured for Production

🛠 Tech Stack


Frontend


React (Vite)
Axios
React Router
CSS

Backend


Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
CORS


FRONTEND_URL=https://app-socialmedia-app.vercel.app


Frontend (.env)


VITE_API_URL=https://socialmedia-60s2.onrender.com

🧑‍💻 Installation (Local Setup)


1️⃣ Clone Repository


https://github.com/abhaypanchalprogrammer/Backend/tree/main/Projects/Project-1_Social-Media



2️⃣ Setup Backend

cd backend
npm install
npm run dev

Backend runs on:


http://localhost:3001
3️⃣ Setup Frontend


cd frontend
npm install
npm run dev
Frontend runs on:
http://localhost:5173
🌍 Deployment


Frontend (Vercel)
Framework: Vite
Build Command: npm run build
Output Directory: dist

Environment Variable:


VITE_API_URL
Backend (Render)
Environment Variables configured
CORS configured with exact frontend URL (no trailing slash)

🔐 Authentication Flow


-User logs in
-Backend generates JWT
-Token stored in localStorage
-Token sent in Authorization header
-Protected routes validate user via middleware



🧠 Future Improvements:-



-💬 Comments
-🔔 Notifications
-🔍 Search users
-🌓 Dark mode
-🧪 Unit testing

👨‍💻 Author


Developed by Abhay Panchal

📄 License


This project is open source and available under the MIT License.
