import express from "express"
import  isAuth from "../middlewares/authmiddleware.js";
import { CreateCategoryController, deletecateController, GetALLCategoyController, updateCategoryController } from "../controllers/catecontroller.js";

const router = express.Router();

// create categories
router.post("/create", isAuth,CreateCategoryController)
//get all cate
router.get("/getallcat", isAuth, GetALLCategoyController)
// delete category
router.delete("/delete/:id", isAuth,deletecateController)
//update cat
router.put("/updatecat/:id", isAuth,updateCategoryController )

export default router;