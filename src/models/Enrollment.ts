// models/Enrollment.ts
import mongoose from "mongoose";

export type Enrollment = {
    student: mongoose.Schema.Types.ObjectId; // Ref to User
    course: mongoose.Schema.Types.ObjectId; // Ref to Course
    enrollmentDate: Date;
    status: "enrolled" | "completed" | "cancelled";
};

const enrollmentSchema = new mongoose.Schema<Enrollment>(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["enrolled", "completed", "cancelled"],
            default: "enrolled",
        },
    },
    {
        versionKey: false,
    }
);

export const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
