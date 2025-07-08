import { Request, Response, NextFunction } from "express";
import { CourseModel } from "../models/Course";
import { EnrollmentModel } from "../models/Enrollment";
import { ApiErrors } from "../errors/ApiErrors";

export const enrollStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const studentId = (req as any).user.userId; // 👈 Extract from token
        const { courseId } = req.body;

        // Check if course exists
        const course = await CourseModel.findById(courseId);
        if (!course) {
            throw new ApiErrors(404, "Course not found");
        }

        // Use nullish coalescing to handle undefined currentEnrollments
        const currentEnrollments = course.currentEnrollments ?? 0;

        if (currentEnrollments >= course.maxStudents) {
            throw new ApiErrors(400, "Course is full. Cannot enroll.");
        }

        // Check for duplicate enrollment
        const alreadyEnrolled = await EnrollmentModel.findOne({
            student: studentId,
            course: courseId,
        });
        if (alreadyEnrolled) {
            throw new ApiErrors(400, "You are already enrolled in this course");
        }

        // Create enrollment
        const enrollment = await EnrollmentModel.create({
            student: studentId,
            course: courseId,
        });

        // Update currentEnrollments
        course.currentEnrollments = currentEnrollments + 1;
        await course.save();

        res.status(201).json({
            message: "Enrolled successfully",
            enrollment,
        });
    } catch (err) {
        next(err);
    }
};
