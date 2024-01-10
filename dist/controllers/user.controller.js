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
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const create = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const email = reqBody.email.toLowerCase();
    const alreadyExist = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (alreadyExist)
        throw new HttpException_1.default("Email already exists", 400);
    const password = yield bcrypt_1.default.hash(reqBody.password, 10);
    const user = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, reqBody), { email,
            password }),
    });
    const jwttoken = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, env_1.JWT_SECURED_KEY, {
        expiresIn: "2h",
    });
    const updateduser = yield prisma_1.default.user.update({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
        data: Object.assign(Object.assign({}, user), { token: jwttoken }),
    });
    return res.status(201).json({
        message: "User created Successfully",
    });
}));
const get = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findMany({
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
}));
const update = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const userID = req.params.userID;
    const updatedUser = yield prisma_1.default.user.update({
        where: { id: userID },
        data: { name },
    });
    return res.status(201).json({
        message: "User updated sucessfully",
    });
}));
const getProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield prisma_1.default.user.findFirst({
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
}));
const deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.userID;
    const singleUser = yield prisma_1.default.user.delete({
        where: { id: userID },
    });
    return res.status(204).json({
        message: "User deleted sucessfully",
    });
}));
const UserController = { create, get, update, getProfile, deleteUser };
exports.default = UserController;
