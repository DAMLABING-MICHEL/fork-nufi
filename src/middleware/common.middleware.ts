import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { GenericApiResponse } from '../dto/api-response-dto';

export const validateSchema = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { success, error } = schema.safeParse(req.body);
  if (!success) {
      const apiResponse: GenericApiResponse = {
        error: error.errors
            .map((t) => `${t.path[0] ?? ''}: ${t.message}`)
            .join(', ')
      }
    return res.status(401).json(apiResponse);
  }
  next();
};