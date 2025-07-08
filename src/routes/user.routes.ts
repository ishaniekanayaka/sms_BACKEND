import { Router } from "express";

import { upload } from "../middlewares/upload";
import {getAllUsers, login, logout, refreshToken, signUp} from "../controllers/authController";
import {authenticateToken} from "../middlewares/authenticateToken";


const router = Router();



router.post("/", upload.single("profileImage"), signUp);
router.post("/login", login);
router.post("/refresh-token", refreshToken)
router.post("/logout", logout)
router.use(authenticateToken)
router.get("/", getAllUsers);
router.post("/refresh-token", refreshToken)
router.post("/logout", logout)


export default router;