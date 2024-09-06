import { connect } from "@/database/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect();
export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const {email, password} = body;
        const user = await User.findOne({email});
        if(!user)
            return NextResponse.json({massage:"USer Doesnt exist"}, {status:400})
        
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if(!isPasswordMatch)
            return NextResponse.json({massage:"Invalid email or password"},{status:400});
        
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"id"});
        const res = NextResponse.json(
            {
                massage:'Welcome Back ${user.username}',
                success:true
            },
            {status:200}
        );

        res.cookies.set("token", token, {httpOnly:true});
        return res;

    } catch (error:any){
        return NextResponse.json({error:error.massage}, {status:500});
    }
    
}