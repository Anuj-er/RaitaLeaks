import jwt from "jsonwebtoken";

export const genrateTokenAndSetCookie = (userId, res) => {
  // Log to check if JWT_SECRET exists
  console.log("JWT Secret value check:", process.env.JWT_SECRET ? "Secret exists" : "Secret missing");

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set cookie with correct attributes for cross-domain usage
  res.cookie("jwt", token, {
    httpOnly: true, 
    secure: true,   // Requires HTTPS
    sameSite: "none", // Allows cross-domain cookies
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    path: "/"      // Available on all paths
  });

  return token;
};