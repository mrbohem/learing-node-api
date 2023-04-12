import express from 'express'
import signupSchema from '../schema/signupSchema'
import validateRequest from '../middleware/validate-request-schema';
import { signupController } from '../controller/signupController';
import signinSchema from '../schema/signinSchema';
import { signinController } from '../controller/signinController';
import { currentUser } from '../middleware/currentUser';
import { createPost, deletePost, getPosts, getPostWithComment, updatePost } from '../controller/postController';
import postSchema from '../schema/postSchema';
import { hasPermission } from '../middleware/hasPermission';
import updatePostSchema from '../schema/updatePostSchema';
import deltePostSchema from '../schema/deltePostSchema';
import { createComment, deleteComment, getComments, updateComment } from '../controller/commentController';
import commentSchema from '../schema/commentSchema';

const router = express.Router();


router.route('/post')
    .get(currentUser,getPosts)
    .post(currentUser,postSchema,validateRequest,createPost)
    .put(currentUser,updatePostSchema,validateRequest,updatePost)
    .delete(currentUser,deltePostSchema,deletePost)
    
router.route('/comment')
    .get(currentUser,getComments)
    .post(currentUser,commentSchema,validateRequest,createComment)
    .put(currentUser,updatePostSchema,validateRequest,updateComment)
    .delete(currentUser,deltePostSchema,deleteComment)


router.get('/get-post-with-comment',getPostWithComment)

router.get('*',(req,res)=>res.send("not found"));

export { router };