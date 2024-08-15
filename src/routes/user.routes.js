import { Router } from "express";
import {
    addCredits,
    deductCredits,
    loginUser,
    logOutUser,
    refreshAccessToken,
    registerUser,
    getUser
} from "../controllers/user.controller.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured Routes

router.route("/logout").post(varifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/addCredits").post(varifyJWT,addCredits)
router.route("/deductCredits").post(varifyJWT,deductCredits)
router.route("/getUser").get(varifyJWT,getUser)
export default router;
