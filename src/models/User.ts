import mongoose from "mongoose";

export type User = {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "student";
    phone?: string;
    address?: string;
    dateOfBirth?: Date;
    profileImage?: string;
    isActive?: boolean;
    createdAt?: Date;
};

const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Email must be valid"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        role: {
            type: String,
            enum: ["admin", "student"],
            default: "student",
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        profileImage: {
            type: String,
            match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/, "Must be a valid image URL"],
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

export const UserModel = mongoose.model("User", userSchema);
