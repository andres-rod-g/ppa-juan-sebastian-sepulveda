import { NextFunction, Request, Response } from "express";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole !== "ADMIN" && req.userRole !== "SU") {
        console.log("Not enough role.")
        console.log(req.userRole)
        console.log(req.userId)
        return res.status(403).json({message: "User not allowed to continue."})
    }

    next()
}

export default {
    isAdminMiddleware,
}