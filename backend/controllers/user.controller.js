import Notiffication from "../models/notification.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from 'cloudinary';


export const getUserProfile = async (req,res)=>{
  const {username} = req.params
  try {

    const user = await User.findOne({username}).select("-password")

    if(!user) return res.status(404).json({error: "The user not found"})

    res.status(200).json(user)

  } catch (error) {
    console.log("error in the getUserProfile func in user controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}

export const getsuggestedUsers = async (req,res)=>{
  try {
    const userId = req.user._id
    const userFollowedByMe = await User.findById(userId).select("followeing")

    const allUsers = await User.aggregate([
      {
        $match:{
          _id:{$ne: userId}
        }
      },
      {
        $sample: {size:10}
      }
    ])

    const filteredUsers = allUsers.filter((user) => !userFollowedByMe.followeing.includes(user._id))
    // to get 4 people max
    const suggestedUsers = filteredUsers.slice(0,4)
    suggestedUsers.forEach(user=> (user.password = null))

    res.status(200).json(suggestedUsers)
    
  } catch (error) {
    console.log("error in the getsuggestedUsers func in user controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}

export const followUngfollowUsers = async (req,res)=>{
  try {
    const {id} = req.params;
    const userToModifi = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if(id === req.user._id.toString()) return res.status(400).json({error: "You can't follow/unfollow yourself"})

    if(!userToModifi || !currentUser) return res.status(400).json({error: "User not found"})

    const isFollowing = currentUser.followeing.includes(id)

    if(isFollowing){
      // unfollow
      await User.findByIdAndUpdate(id,{$pull: {followers: req.user._id}})
      await User.findByIdAndUpdate(req.user._id,{$pull: {followeing: id}})

      res.status(200).json({message: `you unfollow ${userToModifi.username}`})
    }else{
      // follow
      await User.findByIdAndUpdate(id,{$push: {followers: req.user._id}})
      await User.findByIdAndUpdate(req.user._id,{$push: {followeing: id}})

      // notiffications
      const newNotification = new Notiffication({
        type: "follow",
        from:  req.user._id,
        to: userToModifi._id,
      })

      await newNotification.save()
      res.status(200).json({message: `you follow ${userToModifi.username}`})
    }

  } catch (error) {
    console.log("error in the followUngfollowUsers func in user controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}

export const updateUserProfile = async (req,res)=>{
  const  {fullname,email,username,currentPassword,newPassword,bio,link} = req.body;
  let {profileImg,coverImg} = req.body

  const userId = req.user._id

  try {
    let user = await User.findById(userId)

    if(!user) return res.status(404).json({error: "User not found"})

    if((!newPassword && currentPassword) || (newPassword && !currentPassword)){
      return res.status(400).json({error: "Please provide both the new password and current password"})
    }

    if(newPassword && currentPassword){
      const isMatch = await bcrypt.compare(currentPassword,user.password)
      if(!isMatch) return res.status(400).json({error:"The current password is incorrect"})
      if(newPassword.length < 6) return res.status(400).json({error:"The new password must be at least 6 or more characters"})
      
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword,salt)
    }

    if(profileImg){
      // before adding the new img we must delete the old one from cloudinary db

      if(user.profileImg){

        await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
      }

      const uploadRespones = await cloudinary.uploader.upload(profileImg)
      profileImg = uploadRespones.secure_url
    }

    if(coverImg){
      if(user.coverImg){
         await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0])
       }

      const uploadRespones = await cloudinary.uploader.upload(coverImg)
      coverImg = uploadRespones.secure_url
    }

    user.fullname   = fullname || user.fullname;
    user.username   = username || user.username;
    user.email      = email || user.email;
    user.bio        = bio || user.bio;
    user.link       = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg   = coverImg || user.coverImg;

    user = await user.save()

    user.password = null

    res.status(200).json(user)

  } catch (error) {
    console.log("error in the updateUserProfile func in user controller", error.message)
    res.status(500).json({error: "internal server error"})
  }
}