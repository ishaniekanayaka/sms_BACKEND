import mongoose, { Schema, Document } from "mongoose";

export type Payment = {
    enrollment: mongoose.Schema.Types.ObjectId;
    student: mongoose.Schema.Types.ObjectId;
    amount: number;
    method: "card" | "cash" | "bank";
    status: "pending" | "success" | "failed";
    paymentDate: Date;
};

const paymentSchema = new Schema<Payment>(
    {
        enrollment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: { type: Number, required: true },
        method: {
            type: String,
            enum: ["card", "cash", "bank"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "success",
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

export const PaymentModel = mongoose.model("Payment", paymentSchema);
