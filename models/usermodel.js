import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minLength: [6, "password length should be greater than 6 characters"],
    },
    address:{ type: String, required: true },
    role:{type:String, default:"user"},
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
   profilepic: {
  public_id:
   {
    type:String,
  },
  url:
  {
    type: String,
  },
}
  },
  { timestamps: true }
);


userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
};


const User = mongoose.model("User", userSchema);

export default User;