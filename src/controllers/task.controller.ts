import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";

const create = asyncHandler(async (req: Request, res: Response) => {
  const reqBody = req.body;

  const checkUser = await prisma.user.findFirst({
    where: { id: reqBody.userid },
  });

  if (!checkUser) throw new HttpException("User Doesnot Exist", 404);

  const task = await prisma.task.create({
    data: {
      ...reqBody,
    },
  });

  return res.status(201).json({
    message: "Task created Successfully",
  });
});

const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    data: tasks,
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const reqBody = req.body;
  const taskid = req.params.id;

  const checkTask = await prisma.task.findUnique({ where: { id: taskid } });

  if (!checkTask) throw new HttpException("Task doesnot exist", 404);

  const updatedtask = await prisma.task.update({
    where: { id: taskid },
    data: {
      ...reqBody,
    },
  });
  return res.status(201).json({
    message: "Task Updated Sucessfully",
  });
});

const taskController = { create, getTasks, updateTask };

export default taskController;
