import path from "path"
import { fileURLToPath } from 'url';

import express from "express"
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv" 
import cookieParser from "cookie-parser";
import cors from "cors"; // You might need to install this: npm install cors

import authRoutes from "./routes/auth.route.js"
import usersRoutes from "./routes/user.route.js"
import postsRoutes from "./routes/post.route.js"
import notificationsRoutes from "./routes/notification.route.js"
import connetMongoDB from "./db/connectToMongo.js";

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
})

const app = express(); 
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", JSON.stringify(req.headers));
  
  if (req.method !== 'GET') {
    console.log("Body:", JSON.stringify(req.body));
  }
  
  // Also log the response
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`Response for ${req.method} ${req.url}:`, res.statusCode);
    return originalSend.apply(res, arguments);
  };
  
  next();
});
// Add CORS to allow requests from your Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development frontend
    'https://raita-leaksmain.vercel.app', // Your Vercel domain - replace with actual domain
    /\.vercel\.app$/  // All Vercel preview domains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json({limit:"5mb"})) 
app.use(express.urlencoded({extended:true}))

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/posts", postsRoutes)
app.use("/notifications", notificationsRoutes)

// Replace the production block with this
app.get("/", (req, res) => {
  res.send("RaitaLeaks API is running. Use /api endpoints to access the API.");
});

app.listen(PORT,()=>{
  console.log("server is running at port",PORT)
  connetMongoDB()
})