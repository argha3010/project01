//import { connect as http2connect }  from "http2";
import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully!");            
        })

        connection.on('error', ()=>{
            console.log("mongoDB connection error");
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong", error);
       
    }
};
connect();
