import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { JWT_SECURED_KEY } from "../env";

const create = asyncHandler(async (req: Request, res: Response) => {
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

  return res.status(201).json({
    message: "User created Successfully",
  });
});

const get = asyncHandler(async (req: Request, res: Response) => {
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
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const userID = req.params.userID;

  const updatedUser = await prisma.user.update({
    where: { id: userID },
    data: { name },
  });
  return res.status(201).json({
    message: "User updated sucessfully",
  });
});

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const singleUser = await prisma.user.findFirst({
    where: { id: res.locals.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.status(200).json({
    message: "User profile get sucessfully",
    data: singleUser,
  });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userID = req.params.userID;
  const singleUser = await prisma.user.delete({
    where: { id: userID },
  });
  return res.status(204).json({
    message: "User deleted sucessfully",
  });
});

const UserController = { create, get, update, getProfile, deleteUser };

export default UserController;
