import { Router } from "express";

import { upload } from "../middlewares/upload";
import {getAllUsers, getLoggedInUser, login, logout, refreshToken, signUp} from "../controllers/authController";
import {authenticateToken} from "../middlewares/authenticateToken";
import {authorizeRoles, verifyToken} from "../middlewares/auth";


const router = Router();



router.post("/", upload.single("profileImage"), signUp);
router.post("/login", login);
router.post("/refresh-token", refreshToken)
router.post("/logout", logout)
router.get("/users", authenticateToken, getAllUsers)
router.get("/me", authenticateToken, getLoggedInUser);
router.get("/",verifyToken, authorizeRoles("admin"), getAllUsers);
router.post("/refresh-token", refreshToken)
router.post("/logout", logout)



export default router;