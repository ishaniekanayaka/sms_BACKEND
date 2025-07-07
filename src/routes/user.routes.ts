// src/routes/user.routes.ts

import { Router } from "express";

import { upload } from "../middlewares/upload";
import {signUp} from "../controllers/userController";

const router = Router();

// Create user with profile image upload (multipart/form-data)
router.post("/", upload.single("profileImage"), signUp);


export default router;
