import { ValidationError } from "express-validator"
import { CustomErrorContract } from "./custom-errors-contract"

export class RequestValidationError extends CustomErrorContract{
    
    statusCode = 400

    constructor(public errors:ValidationError[]){
        super("Invalid Request Data")
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map((err)=>{
            return {message:err.msg, field:err.param}
        })
    }
}