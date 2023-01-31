import { body } from "express-validator";

const updatePostSchema = [
    body("postId").notEmpty().withMessage("Post id can't be empty"),
    body("title").isLength({ min: 4, max: 20 }).withMessage("Title should have at least 4 characters"),
    body("body").isLength({ min: 4, max: 20 }).withMessage("Body should have at least 4 characters"),
]

export default updatePostSchema