<div align="center">
  
# 🚀 RaitaLeaks

<img src="https://github.com/Anuj-er/RaitaLeaks/frontend/public/RaitaLeaksLogo.png" alt="RaitaLeaks Logo" width="150"/>

### *Because sometimes, spilling the tea isn't enough - Let's leak the Raita!*
  
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 💫 What is RaitaLeaks?

RaitaLeaks is a modern social media platform built on the powerful MERN stack. It demonstrates how contemporary social networking can combine robust functionality with an intuitive user experience.

> 💡 **Vision**: Creating a space where sharing experiences becomes seamless, engaging, and meaningful.

Users can register, personalize their digital presence, share content, connect with like-minded individuals, and engage with a community that values authentic expression.

---

## ✨ Feature Highlights

<table>
  <tr>
    <td width="50%">
      <h3>🔐 User Experience</h3>
      <ul>
        <li>Intuitive authentication system</li>
        <li>Personalized profile customization</li>
        <li>Smart following system</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📱 Content Creation</h3>
      <ul>
        <li>Dynamic post creation and sharing</li>
        <li>Media uploads and integration</li>
        <li>Interactive reactions and comments</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔔 Connectivity</h3>
      <ul>
        <li>Real-time notification system</li>
        <li>WebSocket integration for instant updates</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📊 Design & UX</h3>
      <ul>
        <li>Responsive design across all devices</li>
        <li>Intuitive, user-centered interface</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Technology Stack

<div align="center">

### 🔧 MERN: Powerful & Flexible 🔧

</div>

| Layer | Technology | Functionality |
|-------|------------|---------------|
| 🎨 **Frontend** | React.js | Interactive UI components with state management |
| ⚙️ **Backend** | Node.js + Express.js | Fast, scalable server-side operations |
| 🗄️ **Database** | MongoDB | Flexible, document-based data storage |
| 🖼️ **Storage** | Cloudinary | Cloud-based media management |
| 🔑 **Security** | JWT & OAuth | Robust authentication protocols |
| ⚡ **Realtime** | WebSockets | Instant bi-directional communication |

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (latest stable version)
- MongoDB account
- Cloudinary account (optional, for image storage)

### 📥 Installation

#### 1️⃣ Clone the Repository

```bash
git clone [repository URL]
cd raita-leaks
```

#### 2️⃣ Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 🖥️ Running the Application

#### Production Mode

```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Start the application
npm run start
```

#### Development Mode

```bash
# Start the backend server
npm run dev

# In a new terminal, start the frontend
cd frontend
npm run dev
```

Access the application at `http://localhost:5173` (or the port specified by Vite)

---

## 📁 Project Architecture

### System Architecture Overview

```mermaid
graph TD
    subgraph Client
        A[User Browser] --> B[React Frontend]
        B --> C[React Components]
        C --> D[API Calls]
    end
    
    subgraph Server
        D --> E[Express Server]
        E --> F[API Routes]
        F --> G[Controllers]
        G --> H[Models]
    end
    
    subgraph Database
        H --> I[MongoDB]
    end
    
    subgraph Services
        G --> J[Authentication]
        G --> K[Cloudinary]
        G --> L[WebSockets]
    end
    
    style Client fill:#f9f9ff,stroke:#9999ff,stroke-width:2px
    style Server fill:#f9fff9,stroke:#99ff99,stroke-width:2px
    style Database fill:#fff9f9,stroke:#ff9999,stroke-width:2px
    style Services fill:#fffff9,stroke:#ffff99,stroke-width:2px
```

### Directory Structure

```
📦 RaitaLeaks
 ┣ 📂 backend
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📄 auth.controller.js
 ┃ ┃ ┣ 📄 notifications.controller.js
 ┃ ┃ ┣ 📄 post.controller.js
 ┃ ┃ ┗ 📄 user.controller.js
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📄 notification.model.js
 ┃ ┃ ┣ 📄 post.model.js
 ┃ ┃ ┗ 📄 user.model.js
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📄 auth.route.js
 ┃ ┃ ┣ 📄 notification.route.js
 ┃ ┃ ┣ 📄 post.route.js
 ┃ ┃ ┗ 📄 user.route.js
 ┃ ┗ 📄 server.js
 ┣ 📂 frontend
 ┃ ┣ 📂 public
 ┃ ┃ ┗ 📂 favicon_io
 ┃ ┗ 📂 src
 ┃   ┣ 📂 components
 ┃   ┣ 📂 hooks
 ┃   ┣ 📂 pages
 ┃   ┣ 📂 styles
 ┃   ┗ 📂 utils
```

### Data Flow Diagram

```mermaid
flowchart LR
    User([User]) <--> Frontend[React Frontend]
    
    subgraph Client Side
        Frontend --> AuthService[Auth Service]
        Frontend --> PostService[Post Service]
        Frontend --> UserService[User Service]
        Frontend --> NotificationService[Notification Service]
    end
    
    subgraph Server Side
        AuthService <--> AuthController[Auth Controller]
        PostService <--> PostController[Post Controller]
        UserService <--> UserController[User Controller]
        NotificationService <--> NotificationController[Notification Controller]
        
        AuthController --> UserModel[User Model]
        PostController --> PostModel[Post Model]
        UserController --> UserModel
        NotificationController --> NotificationModel[Notification Model]
        
        UserModel --> MongoDB[(MongoDB Database)]
        PostModel --> MongoDB
        NotificationModel --> MongoDB
    end
    
    subgraph External Services
        UserController <--> CloudinaryAPI[Cloudinary API]
        NotificationController <--> WebSockets[WebSockets]
    end
    
    style Client Side fill:#f0f8ff,stroke:#4682b4
    style Server Side fill:#f5f5dc,stroke:#8b8970
    style External Services fill:#e6e6fa,stroke:#8470ff
```

---

## 🤝 Contributing

We welcome contributions to RaitaLeaks! Here's how to get involved:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Submit** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👏 Acknowledgments

- **404Coders team** for creating and maintaining the project

<div align="center">

---

### *© 2025 RaitaLeaks. Created with ❤️ by 404Coders.*

<p align="center">
  <a href="https://github.com/yourusername/RaitaLeaks">
    <img src="https://img.shields.io/github/stars/anuj-er/RaitaLeaks?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/yourusername/RaitaLeaks/network/members">
    <img src="https://img.shields.io/github/forks/anuj-er/RaitaLeaks?style=social" alt="GitHub forks">
  </a>
  <a href="https://github.com/yourusername/RaitaLeaks/issues">
    <img src="https://img.shields.io/github/issues/anuj-er/RaitaLeaks" alt="GitHub issues">
  </a>
</p>

</div>