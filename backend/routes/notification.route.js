import express  from "express"
import { protectRoute } from "../middleWare/protectRoute.js"
import { deleteNotifications, getNotifications } from "../controllers/notifications.controller.js"

const route = express.Router()

route.get("/",protectRoute,getNotifications)
route.delete("/",protectRoute,deleteNotifications)

export default route