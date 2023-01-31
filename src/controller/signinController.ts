import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import {User} from "../models/user";
import { Password } from "../services/password";

export const signinController = async (req:Request,res:Response)=>{
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return res.status(400).send({ message:"email not found"})
    }
    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    );

    if (!passwordsMatch) {
        return res.status(400).send({ message:"password does not match"})
    }
    console.log(process.env.JWT_KEY);
    
    const userJwt = jwt.sign(
    {
        id: existingUser.id,
        email: existingUser.email,
        role:existingUser.role
    },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(existingUser);
}

export const changeRole = async (req:Request,res:Response) => {
    const {role,email} = req.body
    const {modifiedCount} = await User.updateOne({email},{role})
    if(modifiedCount == 1){
        return res.status(200).json({"message":"updated"})
    }
}

// madhur rastogi 
// hema bist 