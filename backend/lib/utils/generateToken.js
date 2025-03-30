import jwt from "jsonwebtoken";

export const genrateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    console.log("JWT Secret value check:", process.env.JWT_SECRET ? "Secret exists" : "Secret is missing");
    
    res.cookie("jwt", token, {
      httpOnly: true, 
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development" ? true : false,
    });
  } catch (error) {
    console.log("error in genrate token func", error.message);
    throw error;
  }
};