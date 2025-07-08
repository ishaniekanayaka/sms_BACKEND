import express from "express";
import {cancelEnrollment, enrollStudent, getAllCompleted, getAllEnrolled} from "../controllers/EnrollmentController";
import { authenticateToken } from "../middlewares/authenticateToken";
import {authorizeRoles} from "../middlewares/auth";


const router = express.Router();
router.use(authenticateToken)

router.post("/", enrollStudent, authorizeRoles("student"));
router.put("/:id/cancel",  cancelEnrollment, authorizeRoles("student"));
router.get("/allEnrolled", getAllEnrolled, authorizeRoles("admin"));
router.get("/complete", getAllCompleted, authorizeRoles("admin"))

export default router;
