import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.get("/test", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "Test route",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
