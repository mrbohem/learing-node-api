import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import {User} from "../models/user";

export const signupController = async (req:Request,res:Response)=>{
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).send({ message:"email already in use"})
    }

    const user = new User({email,password,'role':'user'})
    await user.save();

    const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role:user.role
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt
      };

      // res.cookie("jwt",userJwt,{
      //   expires:new Date(Date.now()+3652541254),
      //   httpOnly:true
      // })

    res.status(201).send(user);
}