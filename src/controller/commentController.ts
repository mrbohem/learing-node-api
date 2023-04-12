import { NextFunction, Request, Response } from "express"
import {Comment} from "../models/comment"

export const getComments= async(req:Request, res:Response) => {
    const comments = await Comment.find({});
    if(comments){    
        res.status(200).json({ data: comments });
    }
    else{
        res.status(404).json({"message":"comment not found"})
    }
}

export const createComment = async(req:Request, res:Response) => {
    const comment = new Comment(req.body)

    comment.save((err,result)=>{
        return err ? console.log(err):res.status(200).json(result)
    })
}


export const updateComment = async (req:Request, res:Response,next:NextFunction) => {
    try{
        const update = req.body
        const commentId = req.body.commentId
        await Comment.findByIdAndUpdate(commentId, update)
        const data = await Comment.findById(commentId)
        res.status(200).json(data)
    }
    catch(err) {
        next(err)
    }
}

export const deleteComment = async (req:Request, res:Response) => {
    try{
        const postId = req.body.postId
        await Comment.findByIdAndDelete(postId)
        res.status(200).json({
            data: 'Post has been deleted'
        });
    }
    catch(err){}
}