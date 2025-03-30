import express from "express"
import {signup,login,logout, getMe} from "../controllers/auth.controller.js"
import {protectRoute} from "../middleWare/protectRoute.js"

const route = express.Router()

route.post("/signup",signup)
route.post("/login",login)
route.post("/logout",logout)
route.get("/me",protectRoute,getMe)

export default route