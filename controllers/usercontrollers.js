
import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary"
import jwt from "jsonwebtoken";
import { getDataUri } from "../utils/features.js";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, phone, password, city, country, address } = req.body;

    // validation
    if (!name || !email || !phone || !password || !city || !country || !address) {
      return res.status(400).send({
        success: false,
        message: "please provide all fields",
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "email already taken",
      });
    }

    // 🔥 HASH PASSWORD (correct)
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
      name,
      email,
      phone,
      city,
      country,
      address,
      password: hashedPassword,
    });

    return res.status(201).send({
      success: true,
      message: "register successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in register api",
      error: error.message,
    });
  }
};
//login controller 


export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "please add email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error: error.message,
    });
  }
};
export const GetUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    // secure profile fetched by cookie
    res.status(200).send({
      success: true,
      message: "user profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in profile api",
      error: error.message,
    });
  }
};
export const  logoutController =  async (req,res) =>{
try {
  res.clearCookie("token")
   res.status(200).send({
      success: true,
      message: "cookie clear successfully",
  
    });
} catch (error) {
  console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in clear cookie api",
      error: error.message,
    });
}
}

export const UpdateUserProfileCOntroller = async (req,res)=>{
  try {
    const user = await userModel.findById(req.user._id)
    //destrucutre
    const { name, email, phone, password, city, country, address} =req.body
    //validation + update
    if(name) user.name = name
    if(email) user.email = email
    if(phone) userphone = phone
    if(password) user.password = password
    if(city) user.city = city
    if(address) user.address = address
    if(country) user.country= country
    //save user
    await user.save();
    res.status(200).send({
      success:true,
      message:"user profile update",
      user,
    })
  } catch (error) {
     console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in update user api",
      error: error.message,
    });
  }
}
//update password 


export const UpdatepasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const { oldpassword, newpassword } = req.body;

    // validation
    if (!oldpassword || !newpassword) {
      return res.status(400).send({
        success: false,
        message: "please provide old and new password",
      });
    }

    // check old password
    const match = await bcrypt.compare(oldpassword, user.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // 🔥 HASH NEW PASSWORD (IMPORTANT FIX)
    user.password = await bcrypt.hash(newpassword, 10);

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in update password api",
      error: error.message,
    });
  }
};
//update profile pic
export const changephotoController = async (req,res)=>{
  try {
    const user = await userModel.findById(req.user._id)
    //get file from user /client get photo
    const file = getDataUri(req.file)
    //delete prev image 
    
    const cdb = await cloudinary.v2.uploader.upload(file.content)
    user.profilepic = {
      public_id: cdb.public_id,
      url:cdb.secure_url
    }
    //save function 
    await user.save();
    res.status(200).send({
      success:true,
      message:"profile picture upload"
    })
  } catch (error) {
     console.log(error);

    return res.status(500).send({
      success: false,
      message: "error in update user profile1 api",
      error: error.message,
    });
  }
}