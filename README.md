# 🚀 ReviewCollection

# Project Title: ReviewCollection

## 📖 Description

**ReviewCollection** is a full-stack web app designed to simulate a mini social media platform focused on user reviews. It's built for users to share their opinions on anything – products, movies, books – in a format similar to a microblog. Each review supports text, media (images/videos), hashtags, and URLs.

Users can interact through likes, comments, and share posts via unique URLs.

---

## 🛠️ Tech Stack

### Frontend 🧑‍🎨
- React.js (with Hooks)
- Tailwind CSS
- JavaScript
- Axios
- React Icons
- Framer-motion

### Backend 🧑‍💻
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Cloudinary for media hosting
- JWT for authentication

--- 

## 🏁 Installation

```bash
# Clone the repository
git clone https://github.com/Vikram-Kumar12/Review-Collection2-.git

# Install dependencies
cd Review-Collection2-/Frontend
npm install

cd ../Backend
npm install

Add in env file:
PORT=5000
FRONTEND_URL=
BASE_URL=
MONGO_URI = 
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_ACCESS_EXPIRY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Start the backend server
cd Backend
npm run dev

# Start the frontend server
cd ../Frontend
npm run dev

Add in env file:
VITE_API_URL=
```

---

## 📂 Folder Structure

```
Review-Collection2-/
├── Backend/
│   ├── src/
│   │   ├── congig/          
│   │   └── controllers/      
│   │   ├── db/              
│   │   └── middlewares/      
│   │   └── models/      
│   │   └── passport/      
│   │   └── routes/      
│   │   ├── app.js           
│   ├── package.json
│   └── index.js             # Server start
│   └── .env             
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/      # React components
│   │   		├── authentication/      
│   │   		├── Dashboard/      
│   │   		├── Home/      
│   │   		├── postReview/            
│   │   ├── features/
│   │   ├── custom hooks/
│   │   ├── pages/
│   │   ├── service/
│   │   ├── utils/           
│   │   ├── App.jsx           
│   │   └── main.jsx          
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ✨ Features

### 🔐 Authentication
- **JWT-based login/signup**
- **Secure password storage** (bcrypt)
- Role-based access (optional)

### 📝 Reviews
- Text-based posts 
- Supports images/videos via **Cloudinary**
- Live media preview before posting

### ❤️ Likes & Comments
- Like/unlike toggle (real-time updates)
- Post a comment with validation and pagination
- Comment count auto-updated

### 🔗 Shareable URLs
- Each review has a unique URL
- Clicking “Share” copies the link to clipboard
- Anyone with the link can view the post

### 🟦 Hashtags and Links
- #Hashtags are highlighted and clickable
- URLs in text auto-detected and clickable (open in new tab)

### 📦 Lazy Loading & Intersection Observer
- Infinite scroll using `IntersectionObserver`
- Lazy loading images/videos for performance

### 📱 Responsive & Accessible UI
- Mobile-first design using Tailwind CSS
- Accessible via keyboard
- Semantic HTML and ARIA support

---

## 📨 API Documentation

> Base URL: `/api`

### 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/login-with-google` | Register new user | Login user |
| GET | `/auth/logout` | Logout user |
| GET | `/auth/refresh-token` | refreshAccessToken |
| GET | `/auth/profile` | userProfile |
| GET | `/auth/refresh-user-auth` | refreshUserAuth |

### 📝 Review Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/review/create-review` | Create new review |
| GET | `/review/get-all-review` | Get all reviews |
| GET | `/review/get-review-by-user` | getReviewByUser |
| DELETE | `/review/delete-review/:reviewId` | deleteReviewById |

### ❤️ Like Review Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/like/like-review` | toggleLike |

### 📝 Comments Review Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/comment/post-comment` | createComment |
| GET | `/comment/all-comment/:reviewId` | getAllComment |
| POST | `/comment/edit-comment` | editComment |
| DELETE | `/comment/delete-comment` | deleteComment |

### 🗂️ Example Review JSON

```json
{
  "_id": "123456",
  "text": "Loving the #JavaScript updates! Check this: https://developer.mozilla.org",
  "likes": 10,
  "media": {
    "type": "image",
    "url": "https://cloudinary.com/media.jpg"
  },
  "user": {
    "username": "vikram_k",
    "avatar": "/avatar.jpg"
  }
}
```

---

## 🖼️ Screenshot Of ReviewCollection

- ✅ Login page
![alt text](</Frontend/public/assets/images/Login Page.png>)

- ✅ Home page
![alt text](</Frontend/public/assets/images/Home Page.png>)

- ✅ Features of ReviewCollection
![alt text](</Frontend/public/assets/images/Features of ReviewCollection.png>)

- ✅ Listed Reviews
![alt text](</Frontend/public/assets/images/Listed Reviews.png>)

- ✅ Create Review page
![alt text](</Frontend/public/assets/images/Post Review Page.png>)

- ✅ User Dashboard
![alt text](</Frontend/public/assets/images/User dashboard.png>)

- ✅ Admin Dashboard
![alt text](</Frontend/public/assets/images/Admin Dashboard.png>)

- ✅ Profile Page
![alt text](</Frontend/public/assets/images/Profile Page.png>)


---

## 📡 Deployment

- **Live App**:[https://www.review-collection.space/](https://www.review-collection.space/)
- Hosted on **Vercel** (frontend) and **Render/any VPS** (backend)

---

## 🙌 Author

**Vikram Kumar**  
GitHub: [Vikram-Kumar12](https://github.com/Vikram-Kumar12/Review-Collection2-)

---


