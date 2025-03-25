import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = await mongoose.connect(process.env.DATABASE_URL_ONLINE).then(() => {
    console.log("Database connected success")
}).catch((err) => {
    console.log("Database connected fail\n", err)
})


export default dbConnection