import mongoose from "mongoose";

const notifficationSchema = mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type:{
    type: String,
    required: true,
    enum:["follow","like"]
  },
  read:{
    type: Boolean,
    default: false
  }
},{timestamps: true})

const Notiffication = mongoose.model("Notiffication",notifficationSchema)

export default Notiffication;