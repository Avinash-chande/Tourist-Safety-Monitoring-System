import { Router } from "express";
import {
    registerUser, loginUser, logoutUser,
} from "../controllers/authController.js";

//we are add this middleware for takeing file as input from user
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured route
router.route("/logout").post(verifyJWT, logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeUserPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateUserDetalis)

export default router