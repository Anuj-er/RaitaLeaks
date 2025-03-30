import mongoose from "mongoose";

const connetMongoDB = async()=>{
  try {
    const  conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected:",conn.connection.host)
  } catch (error) {
    console.log("error connection to mongoDB",error.message)
    process.exit(1)
  }
}

export default connetMongoDB