import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { Permission } from "../models/permisssion";

interface UserPayload {
    id: string;
    email: string;
    role:string;
}

export const hasPermission = async (req: Request, res: Response,next: NextFunction) =>{
  let bearer = new Array()
  if(req.headers['authorization']){
    let auth = req.headers['authorization']
    bearer = auth.split(" ")
  }
  let token = bearer[1] ?? req.session?.jwt
  
  if(!token){
    return res.status(401).json({"message":"user is not logged i"})
  }

  try {
    const user = jwt.verify(
        token,
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
  catch(err){
    if(err instanceof Error && err.message == "invalid token")
    {
      res.status(498).json({"message":err.message})
    }
    console.log(err);
  }
}