import { Request, Response } from "express";
import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";
import { TaskStatusEnum } from "@prisma/client";

const create = asyncHandler(async (req: Request, res: Response) => {
  const { title, startDate, endDate, description } = req.body;

  const checkUser = await prisma.user.findFirst({
    where: { id: res.locals.user.id },
  });

  if (!checkUser) throw new HttpException("User Doesnot Exist", 404);

  let todaydate = new Date();
  todaydate.setUTCHours(0, 0, 0, 0);
  let startdate: Date | undefined;
  let endDates: Date | undefined;

  let status;
  if (startDate) {
    startdate = new Date(startDate);
    if (todaydate > startdate)
      throw new HttpException("Start date is invalid", 401);

    if (todaydate.getTime() == startdate.getTime()) {
      status = TaskStatusEnum.ongoing;
    }
  }

  if (endDate) {
    endDates = new Date(endDate);
    if (endDates < todaydate) {
      throw new HttpException("End date is invalid", 401);
    }
  }

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate))
      throw new HttpException("End date must be greater", 401);
  }

  const task = await prisma.task.create({
    data: {
      title,
      startDate: startdate,
      endDate: endDates,
      description,
      userId: res.locals.user.id,
      status,
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
  });
  return res.status(200).json({
    status: true,
    message: "The list of tasks get sucessfully",
    data: tasks,
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, startDate, endDate, description } = req.body;
  const taskid = req.params.id;

  const valid = await prisma.task.findUnique({ where: { id: taskid } });

  if (!valid) throw new HttpException("Task doesnot exist", 404);

  let todaydate = new Date();
  todaydate.setUTCHours(0, 0, 0, 0);
  let startdate: Date | undefined;
  let endDates: Date | undefined;

  let status;
  if (startDate) {
    startdate = new Date(startDate);
    if (todaydate > startdate)
      throw new HttpException("Start date is invalid", 401);

    if (todaydate.getTime() == startdate.getTime()) {
      status = TaskStatusEnum.ongoing;
    }
  }

  if (endDate) {
    endDates = new Date(endDate);
    if (endDates < todaydate) {
      throw new HttpException("End date is invalid", 401);
    }
  }
  if (valid.startDate && endDate) {
    endDates = new Date(endDate);
    if (endDates < valid.startDate) {
      throw new HttpException("End date cannot be less than start date", 401);
    }
  }

  if (valid.endDate && startDate) {
    startdate = new Date(startDate);
    if (startdate > valid.endDate) {
      throw new HttpException(
        "Start date cannot be greater than end date ",
        401
      );
    }
  }

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate))
      throw new HttpException("End date must be greater", 401);
  }

  const updatedtask = await prisma.task.update({
    where: { id: taskid },
    data: {
      title,
      startDate: startdate,
      endDate: endDates,
      status,
      description,
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
