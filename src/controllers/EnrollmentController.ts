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

export const cancelEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const studentId = (req as any).user.userId;
        const enrollmentId = req.params.id;

        // Find the enrollment
        const enrollment = await EnrollmentModel.findOne({
            _id: enrollmentId,
            student: studentId,
        });

        if (!enrollment) {
            throw new ApiErrors(404, "Enrollment not found");
        }

        if (enrollment.status === "cancelled") {
            throw new ApiErrors(400, "Enrollment is already cancelled");
        }

        // Update enrollment status
        enrollment.status = "cancelled";
        await enrollment.save();

        // Reduce course's currentEnrollments
        const course = await CourseModel.findById(enrollment.course);
        if (course && (course.currentEnrollments ?? 0) > 0) {
            course.currentEnrollments = (course.currentEnrollments ?? 1) - 1;
            await course.save();
        }

        res.status(200).json({
            message: "Enrollment cancelled successfully",
            enrollment,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllEnrolled = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const enrolled = await EnrollmentModel.find({ status: 'enrolled' })
            .populate('student')
            .populate('course');
        res.status(200).json(enrolled);
    } catch (error) {
        next(error);
    }
};

export const getAllCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const completed = await EnrollmentModel.find({ status: 'completed' })
            .populate('student')
            .populate('course');
        res.status(200).json(completed);
    } catch (error) {
        next(error);
    }
};

