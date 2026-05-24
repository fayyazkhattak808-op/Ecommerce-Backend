import express from "express"
import colors from "colors"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDb from "./config/db.js"
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary"
import Stripe from "stripe";

//config
dotenv.config();
//rest object 
const app = express()
//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db connection 
ConnectDb()
// cloud config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// strpie config
 export const stripe = new Stripe(process.env.STRIPE_API_SECRET);
//route also callback function and also async function 
app.get ("/test",(req,res)=>{
    return res.status(200).send("welcome to the node server")
});
// import all routes
import testRoutes from "./routes/testroutes.js"
import  UserRoutes from "./routes/userroutes.js"
import productroutes from "./routes/productroutes.js"
import orderroutes from "./routes/orderroutes.js"
import categoryroutes from "./routes/categoryroutes.js"
app.use("/api/v1", testRoutes);
app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/product",productroutes)
app.use("/api/v1/cat", categoryroutes)
app.use("/api/v1/order",orderroutes)


const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is starting ${process.env.PORT} on ${process.env.NODE_ENV} Mode`.bgBlack.blue)
});