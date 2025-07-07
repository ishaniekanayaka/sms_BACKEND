import mongoose from "mongoose";

const testUserSchema = new mongoose.Schema({
    name: String,
    email: String
});

export const TestUser = mongoose.model("TestUser", testUserSchema);
