import express from 'express'
import { createPermission } from '../controller/permissionController';
import { createFakePost, createPost } from '../controller/postController';
import { changeRole, signinController } from '../controller/signinController';
import { signupController } from '../controller/signupController';
import { currentUser } from '../middleware/currentUser';
import validateRequest from '../middleware/validate-request-schema';
import signinSchema from '../schema/signinSchema';
import signupSchema from '../schema/signupSchema';

const authRouter = express.Router();
authRouter.route('/signup').post( signupSchema, validateRequest, signupController );
authRouter.route('/signin').post( signinSchema, validateRequest, signinController );
authRouter.route('/signout').post((req,res) => {
    req.session = null
    res.send({})
})
authRouter.post('/me', currentUser,(req,res)=>{
    res.send({ ...req.currentUser || null });
});
authRouter.post('/changeRole',changeRole)
authRouter.route("/permission").post(createPermission)

authRouter.get('/createFakePost',createFakePost)

export { authRouter };