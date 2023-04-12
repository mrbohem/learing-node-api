import { body } from "express-validator";

const commentSchema = [
    body("comment").isLength({ min: 4, max: 20 }).withMessage("Comment should have at least 4 characters"),
    body("post_id").isLength({ min: 4 }).withMessage("Post Id should have at least 4 characters"),
]

export default commentSchema