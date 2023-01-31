import { NextFunction, Request, Response } from "express"
import { Permission } from "../models/permisssion"

export const createPermission = async(req:Request, res:Response) => {
    const permissions = new Permission(req.body)

    permissions.save((err,result)=>{
        err ? console.log(err):res.status(200).json(result)
    })
}