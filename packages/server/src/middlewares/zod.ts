import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema, z } from "zod";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors
            });
        }
        next(error);
    }
};