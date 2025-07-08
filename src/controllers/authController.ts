import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ApiErrors } from "../errors/ApiErrors";
import {UserModel} from "../models/User";
import jwt from "jsonwebtoken";

const createAccessToken = (user: any) => {
    return jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: "15m",}
    );
}


const createRefreshToken = (user: any) => {
    return jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "7d",}
    );
}

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

        const SALT = 10
        const hashPassword = await bcrypt.hash(password, SALT)//salt eka thama 10

        const newUser = new UserModel({
            name,
            email,
            password: hashPassword,
            role,
            phone,
            address,
            dateOfBirth,
            profileImage, // ✅ Save image URL to DB
        });

        await newUser.save();

        const userWithoutPassword = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            address: newUser.address,
            dateOfBirth: newUser.dateOfBirth,
            profileImage: newUser.profileImage,
        }

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error: any) {
        next(error);
    }
};


export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        if (!user) {
            throw new ApiErrors(404, "User not found")
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            throw new ApiErrors(401, "Invalid Credentials")
        }
        const accessToken = createAccessToken(user._id.toString())
        const refreshToken = createRefreshToken(user._id.toString())

        const isProd = process.env.NODE_ENV === "production"

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh-token"
        })

        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken
        }

        res.status(200).json(userWithoutPassword)
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    }catch (error:any){
        next(error)
    }
}