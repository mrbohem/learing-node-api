import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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

const Post = mongoose.model("Post",postSchema)

export { Post }