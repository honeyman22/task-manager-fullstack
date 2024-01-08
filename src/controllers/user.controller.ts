import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import HttpException from "../utils/HttpException";

const create = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const email = reqBody.email.toLowerCase();

  const alreadyExist = await prisma.user.findUnique({
    where: { email },
  });

  if (alreadyExist) throw new HttpException("Email already exists", 400);

  const password = await bcrypt.hash(reqBody.password, 10);

  const user = await prisma.user.create({
    data: {
      ...reqBody,
      email,
      password,
    },
  });

  return res.status(201).json({
    message: "User created Successfully",
    data: user,
  });
};

const get = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(201).json({
    message: "User are listed below",
    data: user,
  });
};

const UserController = { create, get };

export default UserController;
