import dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL as string);
        console.log("DB eka connected una :) ");
    }catch (error){
        console.log("Error connecting to DB :(", error);
        process.exit(1);
    }
}