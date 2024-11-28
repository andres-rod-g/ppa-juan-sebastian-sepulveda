import { ENVIRONMENT } from "@/utils/env";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const responseWithErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

const responseWithGenericResponse = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (ENVIRONMENT !== "PROD") {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.status(400).json({ message: "Something wrong with the request." });
    }

    next()
}

export default {
    responseWithErrors,
    responseWithGenericResponse
}