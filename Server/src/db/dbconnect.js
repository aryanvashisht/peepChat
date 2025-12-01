import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function dbconnect() {
   try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB Connection FAILED : ", error);
        process.exit(1)
    }
}