import { body } from "express-validator";

const deltePostSchema = [
    body("postId").notEmpty().withMessage("Post id can't be empty"),
]

export default deltePostSchema