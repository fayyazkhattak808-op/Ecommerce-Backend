import express from "express"
import { CreateProductController, getallProductsController, GetSingleProductController,
     UpdateProductController,DeleteProductController } from "../controllers/prodcontroller.js";
import  isAuth from "../middlewares/authmiddleware.js";
import { singleupload } from "../middlewares/multer.js";
const router = express.Router();

// get all product
router.get("/getall", getallProductsController)

//get single product
router.get("/getsingleproduct/:id",GetSingleProductController)

//create some prodcut data
router.post("/create",isAuth, singleupload ,  CreateProductController)

//update prodcut
router.put("/:id", isAuth , UpdateProductController)

//delete route
router.delete("/delete/:id", isAuth, DeleteProductController)
export default router;