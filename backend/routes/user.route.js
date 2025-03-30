import express from "express"
import { protectRoute } from "../middleWare/protectRoute.js"
import { followUngfollowUsers, getUserProfile, getsuggestedUsers, updateUserProfile } from "../controllers/user.controller.js"

const route = express.Router()

route.get("/profie/:username",protectRoute,getUserProfile)
route.get("/suggests",protectRoute,getsuggestedUsers)
route.post("/follow/:id",protectRoute,followUngfollowUsers)
route.post("/update",protectRoute,updateUserProfile)

export default route