import productsController from "@/controllers/products.controller";
import expressValidatorMiddleware from "@/middlewares/expressValidator.middleware";
import jwtMiddleware from "@/middlewares/jwt.middleware";
import roleMiddleware from "@/middlewares/role.middleware";
import authService from "@/services/authService";
import { Router } from "express";
import { body, param } from "express-validator";

const productsRouter = Router()

productsRouter.post(
    "/",
    jwtMiddleware.jwtMiddleware, // Must be logged in.
    roleMiddleware.isAdminMiddleware, // Must be admin to post products
    [
        body("name").isLength({min: 3, max: 50}).withMessage("Wrong text. Min: 3, Max: 50"),
        body("description").isLength({min: 3}).withMessage("Wrong text. Min: 3"),
        body("price").isInt({min: 0}).withMessage("Price most be a number greater or equal than 0"),
        body("imageUrl").isLength({min: 3 }).withMessage("Wrong text. Min: 3"),
        body("tags").isArray().withMessage('Must be an array.'),
    ],
    expressValidatorMiddleware.responseWithErrors, // Validate params
    productsController.createProduct
)

productsRouter.get(
    "/:productId",
    productsController.getProduct
)

productsRouter.get(
    "/",
    productsController.getAllProducts
)

productsRouter.put(
    "/:productId",
    jwtMiddleware.jwtMiddleware, // Must be logged in.
    roleMiddleware.isAdminMiddleware, // Must be admin to post products
    [
        body("name").isLength({min: 3, max: 50}).withMessage("Wrong text. Min: 3, Max: 50"),
        body("description").isLength({min: 3}).withMessage("Wrong text. Min: 3"),
        body("price").isLength({min: 3, max: 50}).withMessage("Wrong text. Min: 3, Max: 50"),
        body("imageUrl").isLength({min: 3 }).withMessage("Wrong text. Min: 3"),
        body("tags").isArray().withMessage('Must be an array.'),
    ],
    expressValidatorMiddleware.responseWithErrors,
    productsController.updateProduct
)

productsRouter.delete(
    "/:productId",
    expressValidatorMiddleware.responseWithErrors,
    productsController.removeProduct
)

export default productsRouter