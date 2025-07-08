import { Router } from "express";

import { upload } from "../middlewares/upload";
import {signUp} from "../controllers/authController";


const router = Router();


router.post("/", upload.single("profileImage"), signUp);


export default router;