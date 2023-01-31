import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:'Title is required',
        // minlength:4,
        // maxlength:15
    },
    body:{
        type:String,
        required:'Body is required',
        // minlength:4,
        // maxlength:15
    }
})

const Comment = mongoose.model("Comment",commentSchema)

export { Comment }