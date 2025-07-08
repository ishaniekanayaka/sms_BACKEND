import express from "express";
import {authenticateToken} from "../middlewares/authenticateToken";
import {authorizeRoles} from "../middlewares/auth";
import {createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse} from "../controllers/courseController";


const router = express.Router();
router.use(authenticateToken, authorizeRoles("admin"))


router.post("/", createCourse);
router.get("/", getAllCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id", getCourseById);

export default router;
