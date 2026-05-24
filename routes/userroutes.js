import express from "express"
import { LoginController, logoutController, RegisterController,
changephotoController,
UpdatepasswordController,
UpdateUserProfileCOntroller,
GetUserProfileController} from "../controllers/usercontrollers.js";
import isAuth  from "../middlewares/authmiddleware.js";
import { singleupload } from "../middlewares/multer.js";

//router object 
const router = express.Router();

//post router some data give
//register router
router.post("/register",RegisterController)

//login router
router.post("/login",LoginController)

//get profile
router.get("/profile", isAuth , GetUserProfileController)
//logout profile 
router.get("/logout", isAuth ,  logoutController)
//update  aslo used put profile
router.put("/profile-update", isAuth,UpdateUserProfileCOntroller)
//update password :
router.put("/update-password",UpdatepasswordController) 

//update prffile picture
router.put("/update-picture",isAuth,singleupload,changephotoController)





export default router;