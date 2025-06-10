📝 Simple Social Mini Project
A basic Express.js-based web application where users can register, log in, create posts, like posts, and delete them. This project demonstrates core user authentication and CRUD functionalities using MongoDB, JWT, bcrypt, and file upload with Multer.

🔧 Features
✅ User Registration

🔐 User Login & Logout with JWT-based authentication

🖼️ Profile Picture Upload

📝 Post Creation

❤️ Like/Unlike Posts

❌ Post Deletion

👥 User Profile with All Posts

🛠️ Tech Stack
Backend: Node.js, Express.js

Frontend: EJS templating engine

Database: MongoDB with Mongoose

Authentication: JWT & Bcrypt

File Upload: Multer

Utilities: Cookie-parser, Crypto

📁 Project Structure

project/
│
├── config/
│   └── multer.js            # File upload config
├── models/
│   ├── user.js              # User schema
│   └── post.js              # Post schema
├── public/
│   └── images/uploads/      # Uploaded profile pictures
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── edit.ejs
│   └── profileupload.ejs
├── app.js                   # Main server file
├── package.json
└── README.md

🚀 Getting Started

1. Clone the repository
   git clone https://github.com/your-username/mini-post-app.git
   cd mini-post-app
   
2. Install dependencies
   npm install

3. Set up environment (optional)
   Make sure MongoDB is running on your machine.
   Update connection string and secret in the code if needed.

 4. Run the server
    node app.js
    Then visit: http://localhost:3000

✨ Screens / Routes
  
    | Route             | Description             |
    | ----------------- | ----------------------- |
    | `/`               | Homepage                |
    | `/login`          | Login form              |
    | `/register`       | Registration via POST   |
    | `/profile`        | User profile with posts |
    | `/post`           | Create a new post       |
    | `/like/:id`       | Like/unlike a post      |
    | `/edit/:id`       | Edit a post (form)      |
    | `/update/:id`     | Update post content     |
    | `/logout`         | Log out user            |
    | `/profile/upload` | Upload profile picture  |

🔐 Authentication
JWT is stored in cookies for route protection.

Middleware isLoggedIn is used to protect user routes.

Passwords are securely hashed using bcrypt.

🧠 Notes

This project is intentionally kept simple to focus on core concepts.

No frontend frameworks used – EJS templates only.

Ideal for learning how to handle sessions, file uploads, and MongoDB models in Node.js.



   
