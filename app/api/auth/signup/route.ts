import { NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import { hash } from "bcryptjs";

export const POST = async(req:Request) => {
    const {username, email, password} = await req.json();
    const user = await prisma.user.findFirst({
        where:{
            OR:[
                {username},{email}
            ]
        }
    });

    if(user){
        const message = user.username === username ? "Username already taken" : "Email address is already registered";
        return new Response(JSON.stringify({message}),{status:409})
    }

    const hashedPassword = await hash(password,12);
    await prisma.user.create({
        data:{
            username,email,hashed_password:hashedPassword
        }
    })
   return new NextResponse(JSON.stringify({message:"User created"}),{status:201});
}
