import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { Permission } from "../models/permisssion";

interface UserPayload {
    id: string;
    email: string;
    role:string;
}

export const hasPermission = async (req: Request, res: Response,next: NextFunction) =>{
    if(!req.session?.jwt){
        return res.status(401).json({"message":"user is not logged in"})
    }

  try {
    const user = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;

      if(user.role == "admin"){
        return next()
      }

      let result = await Permission.findOne({
        url:req.url,
        role:user.role,
        method:req.method
      })

      
      if(!result){
        return res.status(403).json({"message":"you don't have rights"})
      }
      next();
  }
  catch(err){ }
}