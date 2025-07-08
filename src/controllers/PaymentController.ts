import { Request, Response, NextFunction } from "express";
import { PaymentModel } from "../models/Payment";
import  { EnrollmentModel } from "../models/Enrollment";
import { ApiErrors } from "../errors/ApiErrors";

export const createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const studentId = (req as any).user.userId; // 👈 Get student from token
        const { enrollmentId, amount, method } = req.body;

        // ✅ Check enrollment belongs to student
        const enrollment = await EnrollmentModel.findOne({
            _id: enrollmentId,
            student: studentId,
        });

        if (!enrollment) {
            throw new ApiErrors(404, "Enrollment not found or does not belong to you");
        }

        if (enrollment.status === "completed") {
            throw new ApiErrors(400, "This enrollment is already completed.");
        }

        // ✅ Create payment
        const payment = await PaymentModel.create({
            enrollment: enrollmentId,
            student: studentId,
            amount,
            method,
            status: "success",
            paymentDate: new Date(),
        });

        // ✅ Mark enrollment as completed
        enrollment.status = "completed";
        await enrollment.save();

        res.status(201).json({
            message: "Payment successful, enrollment marked as completed",
            payment,
        });
    } catch (err) {
        next(err);
    }
};
