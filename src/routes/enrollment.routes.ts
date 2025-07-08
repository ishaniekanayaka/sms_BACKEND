import express from "express";
import { enrollStudent } from "../controllers/EnrollmentController";
import { authenticateToken } from "../middlewares/authenticateToken";
import {authorizeRoles} from "../middlewares/auth";


const router = express.Router();
router.use(authenticateToken, authorizeRoles("student"))

router.post("/", enrollStudent);

export default router;
