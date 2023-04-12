import express, { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";


interface UserPayload {
    id: string;
    email: string;
    role:string;
}

declare global {
    namespace Express {
      interface Request {
        currentUser?: UserPayload;
      }
    }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction ) => {
  let bearer = new Array()
  if(req.headers['authorization']){
    let auth = req.headers['authorization']
    bearer = auth.split(" ")
  }
  let token = bearer[1] ?? req.session?.jwt
  
  if(!token){
    return res.status(401).json({"message":"user is not logged in"})
  }
  
  console.log(token);
  try {
    const payload = jwt.verify(
        token,
        process.env.JWT_KEY!
      ) as UserPayload;
      req.currentUser = payload;
      console.log(payload);
      
  }
  catch(err){ 
    console.log(err);
    
  }
  next();
}