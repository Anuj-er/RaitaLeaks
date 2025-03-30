import express from "express"
import {signup,login,logout, getMe} from "../controllers/auth.controller.js"
import {protectRoute} from "../middleWare/protectRoute.js"

const route = express.Router()

route.get("/me",protectRoute,getMe)
route.post("/signup",signup)
route.post("/login",login)
route.post("/logout",logout)

export default route