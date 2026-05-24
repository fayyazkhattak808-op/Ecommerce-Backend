import express from "express"
import { testController } from "../controllers/testcontroller.js";
//router object 
const router = express.Router();

//get router
router.get ("/test",testController)





export default router;