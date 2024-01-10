import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";
import jwt from "jsonwebtoken";

import prisma from "../prisma";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Bearer");

    if (!token) throw new HttpException("Access denied (Invalid token)", 401);
    jwt.verify(token, "844401TASKMANAGER861d1", async (err, decode) => {
      if (err) throw new HttpException("Invalid Token! Token expired", 400);

      if (!decode) throw new HttpException("Invalid Token! Token expired", 400);

      const jwtPayload = decode as { _id: string; email: string };

      const user = await prisma.user.findUnique({
        where: {
          id: jwtPayload._id,
        },
      });

      if (!user) throw new HttpException("Access denied (Invalid token)", 401);

      res.locals.user = user;

      return next();
    });
  } catch (err) {
    return next(err);
  }
};
