import { Request, Response, NextFunction } from "express";

import { ApiErrors } from "../errors/ApiErrors";
import {UserModel} from "../models/User";

// ✅ Create User with Cloudinary image upload
export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            name,
            email,
            password,
            role,
            phone,
            address,
            dateOfBirth,
        } = req.body;

        const profileImage = req.file?.path; // ✅ Cloudinary image URL

        const newUser = new UserModel({
            name,
            email,
            password,
            role,
            phone,
            address,
            dateOfBirth,
            profileImage, // ✅ Save image URL to DB
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error: any) {
        next(error);
    }
};
