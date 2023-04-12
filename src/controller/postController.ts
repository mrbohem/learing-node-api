import { NextFunction, Request, Response } from "express"
import { Comment } from "../models/comment";
import {Post} from "../models/post"
import mongoose from "mongoose";
import crypto from 'crypto'


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

// export const createFakePosts = 

export const getPostWithComment  = async(req:Request,res:Response) => {
    try{
        const page = req.body.page
        const limit = req.body.limit
        const posts = await Post.find().limit(limit).skip(limit*page)
        const comments = await Comment.find()


        // interface MyObject {
        //     ...Object.keys(Post.schema.obj)
        //     commnet: JSON
        // }
        let responseData: any = []

        posts.forEach(post => {
            
            const postComment = comments.filter(comment => post.id == comment.post_id)
            responseData.push({...post.toJSON(),"comments":postComment})
        });
        
        res.status(200).json( responseData );
    }
    catch(err){
    }
}


export const createFakePost = async(req:Request,res:Response) =>{
    const title = crypto.randomBytes(20).toString('hex');
    const body = title

    const post = await new Post({title,body})

    post.save((err,result)=>{
        return err ? console.log(err):res.status(200).json(result)
    })
}