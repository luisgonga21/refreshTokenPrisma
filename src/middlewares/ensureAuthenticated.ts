import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    // Bearer token => fesfsdfvcdsfvdfvrdf
    const [, token] = authToken.split(" ");

    try {
        verify(token, "410b99d9-eec5-4552-892e-84ea446d99b4")
    
        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Token invalid!!",
        })
    }
}