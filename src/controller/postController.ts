import { NextFunction, Request, Response } from "express"
import {Post} from "../models/post"

export const getPosts = async(req:Request, res:Response) => {
    const posts = await Post.findOne({
        "title":req.body.title
    });
    if(posts){    
        res.status(200).json({ data: posts });
    }
    else{
        res.status(404).json({"message":"article not found"})
    }
}

export const createPost = async(req:Request, res:Response) => {
    const post = new Post(req.body)
    console.log(post);
    
    post.save((err,result)=>{
        return err ? console.log(err):res.status(200).json(result)
    })
}


export const updatePost = async (req:Request, res:Response,next:NextFunction) => {
    try{
        const update = req.body
        const postId = req.body.postId
        await Post.findByIdAndUpdate(postId, update)
        const data = await Post.findById(postId)
        res.status(200).json(data)
    }
    catch(err) {
        next(err)
    }
}

export const deletePost = async (req:Request, res:Response) => {
    try{
        const postId = req.body.postId
        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            data: 'Post has been deleted'
        });
    }
    catch(err){}
}