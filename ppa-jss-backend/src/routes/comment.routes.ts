import commentController from "@/controllers/comment.controller";
import jwtMiddleware from "@/middlewares/jwt.middleware";
import roleMiddleware from "@/middlewares/role.middleware";
import { Router } from "express";
import { body } from "express-validator";

const commentsRouter = Router()

commentsRouter.get(
    "/",
    commentController.getComments
)

commentsRouter.delete(
    "/:commentId",
    jwtMiddleware.jwtMiddleware, // Must be logged in.
    commentController.removeComment
)

commentsRouter.post(
    "/",
    jwtMiddleware.jwtMiddleware, // Must be logged in.
    [
        body("text").isString().withMessage("A content for 'text' must be written."),
        body("productId").isString().withMessage("A content for 'productId' must be written."),
    ],
    commentController.postComment
)

commentsRouter.put(
    "/:commentId",
    jwtMiddleware.jwtMiddleware, // Must be logged in.
    [
        body("text").isString().withMessage("A content for 'text' must be written."),
        body("authorUserId").isString().withMessage("A content for 'authorUserId' must be written."),
        body("productId").isString().withMessage("A content for 'productId' must be written."),
    ],
    commentController.updateComment
)

export default commentsRouter