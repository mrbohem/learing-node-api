import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    role:{
        type:String,
        required:'role is required',
        // minlength:4,
        // maxlength:15
    },
    url:{
        type:String,
        required:'URL is required',
        // minlength:4,
        // maxlength:15
    },
    method:{
        type:String,
        required:"method is required"
    }
})

const Permission = mongoose.model("Permission",permissionSchema)

export { Permission }