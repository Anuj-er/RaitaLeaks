import path from "path"
import express from "express"
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv" 
import cookieParser from "cookie-parser";


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
const __dirname = path.resolve()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json({limit:"5mb"})) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/posts",postsRoutes)
app.use("/api/notifications",notificationsRoutes)

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';

if (env === "production") {
  console.log('Entering production block');
  
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
  });
  console.log('NODE_ENV:', env, '__dirname:', __dirname);
} else {
  console.log('Not in production');
}

app.listen(PORT,()=>{
  console.log("server is running at port",PORT)
  connetMongoDB()
})