import express from "express"
import  isAuth  from "../middlewares/authmiddleware.js";
import { CreateOrderContorller, GetallOrderController, GetMyAllOrderCOntroller, GetMyOrderController, PaymentController } from "../controllers/ordercontroller.js";

const router = express.Router();
//post route
router.post("/create",  CreateOrderContorller )

//get all order routes 
router.get("/getallorder", isAuth, GetallOrderController)

//get  my order by id 
router.get("/myorder/:id", isAuth , GetMyOrderController)
//accept payment 
router.post("/payments", isAuth , PaymentController)

//admin section
//get route for admin
router.get("/getallorder", isAuth ,  GetMyAllOrderCOntroller)




export default router;