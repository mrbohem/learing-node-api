import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:'Title is required',
        // minlength:4,
        // maxlength:15
    },
    post_id:{
        type:String,
        required:'Body is required',
        // minlength:4,
        // maxlength:15
    }
})

const Comment = mongoose.model("Comment",commentSchema)

export { Comment }

