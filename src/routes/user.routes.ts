import { Router } from "express";

import { upload } from "../middlewares/upload";
import {getAllUsers, login, signUp} from "../controllers/authController";
import {authenticateToken} from "../middlewares/authenticateToken";


const router = Router();



router.post("/", upload.single("profileImage"), signUp);
router.post("/login", login);
router.use(authenticateToken)
router.get("/", getAllUsers);


export default router;