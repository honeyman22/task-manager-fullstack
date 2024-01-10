"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const client_1 = require("@prisma/client");
const create = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, startDate, endDate, description } = req.body;
    const checkUser = yield prisma_1.default.user.findFirst({
        where: { id: res.locals.user.id },
    });
    if (!checkUser)
        throw new HttpException_1.default("User Doesnot Exist", 404);
    let todaydate = new Date();
    todaydate.setUTCHours(0, 0, 0, 0);
    let startdate;
    let endDates;
    let status;
    if (startDate) {
        startdate = new Date(startDate);
        if (todaydate > startdate)
            throw new HttpException_1.default("Start date is invalid", 401);
        if (todaydate.getTime() == startdate.getTime()) {
            status = client_1.TaskStatusEnum.ongoing;
        }
    }
    if (endDate) {
        endDates = new Date(endDate);
        if (endDates < todaydate) {
            throw new HttpException_1.default("End date is invalid", 401);
        }
    }
    if (startDate && endDate) {
        if (new Date(startDate) > new Date(endDate))
            throw new HttpException_1.default("End date must be greater", 401);
    }
    const task = yield prisma_1.default.task.create({
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
}));
const getTasks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma_1.default.task.findMany({
        where: { userId: res.locals.user.id },
    });
    return res.status(200).json({
        status: true,
        message: "The list of tasks get sucessfully",
        data: tasks,
    });
}));
const updateTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, startDate, endDate, description } = req.body;
    const taskid = req.params.id;
    const valid = yield prisma_1.default.task.findUnique({ where: { id: taskid } });
    if (!valid)
        throw new HttpException_1.default("Task doesnot exist", 404);
    let todaydate = new Date();
    todaydate.setUTCHours(0, 0, 0, 0);
    let startdate;
    let endDates;
    let status;
    if (startDate) {
        startdate = new Date(startDate);
        if (todaydate > startdate)
            throw new HttpException_1.default("Start date is invalid", 401);
        if (todaydate.getTime() == startdate.getTime()) {
            status = client_1.TaskStatusEnum.ongoing;
        }
    }
    if (endDate) {
        endDates = new Date(endDate);
        if (endDates < todaydate) {
            throw new HttpException_1.default("End date is invalid", 401);
        }
    }
    if (valid.startDate && endDate) {
        endDates = new Date(endDate);
        if (endDates < valid.startDate) {
            throw new HttpException_1.default("End date cannot be less than start date", 401);
        }
    }
    if (valid.endDate && startDate) {
        startdate = new Date(startDate);
        if (startdate > valid.endDate) {
            throw new HttpException_1.default("Start date cannot be greater than end date ", 401);
        }
    }
    if (startDate && endDate) {
        if (new Date(startDate) > new Date(endDate))
            throw new HttpException_1.default("End date must be greater", 401);
    }
    const updatedtask = yield prisma_1.default.task.update({
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
}));
const deleteTask = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskid = req.params.id;
    const checkTask = yield prisma_1.default.task.findUnique({ where: { id: taskid } });
    if (!checkTask)
        throw new HttpException_1.default("Task doesnot exist", 404);
    const deletetask = yield prisma_1.default.task.delete({
        where: { id: taskid },
    });
    return res.status(201).json({
        message: "Task deleted successfully",
    });
}));
const taskController = { create, getTasks, updateTask, deleteTask };
exports.default = taskController;
