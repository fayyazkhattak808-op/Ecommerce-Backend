import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";

 const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // ✅ IMPORTANT: use id (not _id)
    const user = await userModel.findById(decoded._id);

    // 🔥 check if user exists
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

export default isAuth;


// admin auth
// middleware/adminMiddleware.js

/*export const isAdmin = (req, res, next) => {
  try {
    // user must be logged in first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login required",
      });
    }

    // check role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in admin middleware",
      error: error.message,
    });
  }
};*/