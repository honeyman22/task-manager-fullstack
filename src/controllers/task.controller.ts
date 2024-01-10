import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";

const create = asyncHandler(async (req: Request, res: Response) => {
  const reqBody = req.body;

  const checkUser = await prisma.user.findFirst({
    where: { id: res.locals.user.id },
  });

  if (!checkUser) throw new HttpException("User Doesnot Exist", 404);

  const task = await prisma.task.create({
    data: {
      ...reqBody,
      userId: res.locals.user.id,
    },
  });

  return res.status(201).json({
    message: "Task created Successfully",
    data: task,
  });
});

const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: { userId: res.locals.user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    status: true,
    message: "The list of tasks get sucessfully",
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
    status: true,
    message: "Task Updated Sucessfully",
    data: updatedtask,
  });
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const taskid = req.params.id;
  const checkTask = await prisma.task.findUnique({ where: { id: taskid } });

  if (!checkTask) throw new HttpException("Task doesnot exist", 404);

  const deletetask = await prisma.task.delete({
    where: { id: taskid },
  });

  return res.status(201).json({
    message: "Task deleted successfully",
  });
});

const taskController = { create, getTasks, updateTask, deleteTask };

export default taskController;
