import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, You need to login first",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findById(decode.userId);

    //    console.log(user);

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Access denied. User not verified.",
      });
    }
    req.user = decode;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
