# ✉️ Saraha Project

## 📌 Description
Saraha allows users to **send anonymous messages**, **edit profiles**, and manage accounts.

## 🌍 Live Demo
🔗 [Saraha Website](https://saraha-website.vercel.app/)

## 🚀 Features
- ✉️ **Send anonymous messages**
- 🔐 **User authentication**
- 📝 **Edit profile** (name, email, password)
- ⚠️ **Error handling**
- 🛢️ **MongoDB database**
- 📧 **Email notifications**
- 🔑 **Secure password hashing**

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Tailwind CSS
- **Database:** MongoDB, Mongoose
- **Validation:** Joi
- **Security:** Bcrypt, Express-session
- **Email Service:** Nodemailer
- **Deployment:** Vercel

## 📥 Installation

### ✅ Prerequisites
- 📌 [Node.js](https://nodejs.org/)
- 📌 [MongoDB](https://www.mongodb.com/)

### 🛠️ Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd saraha
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add:
   ```sh
   DATABASE_URL_ONLINE=<your-mongodb-connection-string>
   URI_LOCAL=mongodb://127.0.0.1:27017/SarahaDb
   SALT_ROUNDS=<Your salt rounds> 5 for example
   SESSION_SECRET=<your-session-secret>
   ```
4. Start the server:
   ```sh
   npm start
   ```

## 📂 Project Structure
```
📂 saraha
│── 📄 package.json
│── 📄 index.js
│── 📂 db
│   ├── 📄 dbConnection.js
│   ├── 📂 models
│       ├── 📄 message.model.js
│       ├── 📄 user.model.js
│── 📂 src
│   ├── 📂 middleware
│   │   ├── 📄 validate.js
│   ├── 📂 modules
│   │   ├── 📂 messages
│   │   │   ├── 📄 message.controller.js
│   │   │   ├── 📄 message.routes.js
│   │   ├── 📂 user
│   │   │   ├── 📄 user.controller.js
│   │   │   ├── 📄 user.routes.js
│   │   │   ├── 📄 user.validation.js
│   ├── 📂 services
│   │   ├── 📄 sendEmail.js
│   ├── 📂 utils
│── 📂 views
│   ├── 📄 editProfile.ejs
│   ├── 📄 errors.ejs
│   ├── 📄 footer.ejs
│   ├── 📄 home.ejs
│   ├── 📄 login.ejs
│   ├── 📄 message.ejs
│   ├── 📄 messageSent.ejs
│   ├── 📄 signUp.ejs
│── 📄 .env
```

## 🎯 Usage
- Go to `http://localhost:3000` to access the app.
- Users can **send anonymous messages** and **edit profiles**.

## 👨‍💻 Author
Created by **Mina Hany**.

## 📜 License
Licensed under **ISC License**.

