import Notiffication from "../models/notification.model.js"

export const getNotifications = async (req,res)=>{
  try {
    const userId = req.user._id

    const notifications = await Notiffication.find({to: userId})
    .populate({
     path: "from",
     select: "username profileImg" 
    })

    await Notiffication.updateMany({to: userId},{read:true})

    res.status(200).json(notifications)
  } catch (error) {
    console.log("error in the getNotifications func in notification controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}

export const deleteNotifications = async (req,res)=>{
  try {
    const userId = req.user._id

    await Notiffication.deleteMany({to:userId})

    res.status(200).json({message:"The notifications is deleted"})
    
  } catch (error) {
    console.log("error in the deleteNotifications func in notification controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}