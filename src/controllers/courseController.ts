// controllers/CourseController.ts
import { Request, Response, NextFunction } from "express";
import { CourseModel } from "../models/Course";
import { ApiErrors } from "../errors/ApiErrors";

// Create Course
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = await CourseModel.create(req.body);
        res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
        next(err);
    }
};

// Get All Courses
export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseModel.find({ isActive: true });
        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
};

// Update Course
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const updated = await CourseModel.findByIdAndUpdate(courseId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            throw new ApiErrors(404, "Course not found");
        }

        res.status(200).json({ message: "Course updated successfully", course: updated });
    } catch (err) {
        next(err);
    }
};

// Delete Course (soft delete)
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            throw new ApiErrors(404, "Course not found");
        }

        course.isActive = false;
        await course.save();

        res.status(200).json({ message: "Course deleted (deactivated) successfully" });
    } catch (err) {
        next(err);
    }
};


// Get a course by ID
export const getCourseById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const courseId = req.params.id;

        const course = await CourseModel.findById(courseId).where({ isActive: true });
        if (!course) {
            throw new ApiErrors(404, "Course not found");
        }

        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
};
