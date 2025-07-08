// models/Course.ts
import mongoose from "mongoose";

export type Course = {
    courseName: string;
    courseCode: string;
    description?: string;
    instructor: string;
    duration: number; // in weeks or months
    fee: number;
    startDate: Date;
    endDate: Date;
    maxStudents: number;
    currentEnrollments?: number;
    isActive?: boolean;
    createdAt?: Date;
};

const courseSchema = new mongoose.Schema<Course>(
    {
        courseName: {
            type: String,
            required: [true, "Course name is required"],
            trim: true,
            minlength: [3, "Course name must be at least 3 characters"],
        },
        courseCode: {
            type: String,
            required: [true, "Course code is required"],
            unique: true,
            uppercase: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        instructor: {
            type: String,
            required: [true, "Instructor name is required"],
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        },
        fee: {
            type: Number,
            required: [true, "Course fee is required"],
            min: [0, "Fee cannot be negative"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        maxStudents: {
            type: Number,
            required: [true, "Maximum number of students is required"],
            min: [1, "Must allow at least 1 student"],
        },
        currentEnrollments: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

export const CourseModel = mongoose.model("Course", courseSchema);
