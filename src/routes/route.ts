import express from 'express'
import signupSchema from '../schema/signupSchema'
import validateRequest from '../middleware/validate-request-schema';
import { signupController } from '../controller/signupController';
import signinSchema from '../schema/signinSchema';
import { signinController } from '../controller/signinController';
import { currentUser } from '../middleware/currentUser';
import { createPost, deletePost, getPosts, updatePost } from '../controller/postController';
import postSchema from '../schema/postSchema';
import { hasPermission } from '../middleware/hasPermission';
import updatePostSchema from '../schema/updatePostSchema';
import deltePostSchema from '../schema/deltePostSchema';

const router = express.Router();


router.route('/post')
    .get(currentUser,getPosts)
    .post(currentUser,postSchema,validateRequest,createPost)
    .put(currentUser,updatePostSchema,validateRequest,updatePost)
    .delete(currentUser,deltePostSchema,deletePost)

router.get('*',(req,res)=>res.send("not found"));

export { router };