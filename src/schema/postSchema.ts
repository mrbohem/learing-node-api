import { body } from "express-validator";

const postSchema = [
    body("title").isLength({ min: 4, max: 20 }).withMessage("Title should have at least 4 characters"),
    body("body").isLength({ min: 4, max: 20 }).withMessage("Body should have at least 4 characters"),
]

export default postSchema