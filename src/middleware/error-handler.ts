import { NextFunction, Request, Response } from "express"
import { CustomErrorContract } from "../errors/custom-errors-contract"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(err);
    
    if (err instanceof CustomErrorContract) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
  
    res.status(400).send({
      errors: [{ message: "Something went wrong" }],
    });
  };
  