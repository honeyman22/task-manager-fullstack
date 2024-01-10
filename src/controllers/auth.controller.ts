import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import { JWT_SECURED_KEY } from "../env";
import jwt from "jsonwebtoken";

const logincontroller = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) throw new HttpException("User not found", 404);

  const passwordCompare = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordCompare) throw new HttpException("Invalid Credentials", 400);

  const jwttoken = jwt.sign(
    { _id: user?.id, email: user?.email },
    JWT_SECURED_KEY,
    {
      expiresIn: "2h",
    }
  );

  const updateduser = await prisma.user.update({
    where: { id: user?.id },
    data: {
      ...user,
      token: jwttoken,
    },
  });

  return res.status(200).json({
    status: true,
    message: "User loged in sucessfully",
    data: {
      email: user.email,
      token: updateduser.token,
    },
  });
});

export default logincontroller;
