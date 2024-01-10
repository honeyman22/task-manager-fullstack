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
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logincontroller = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield prisma_1.default.user.findFirst({
        where: { email },
    });
    if (!user)
        throw new HttpException_1.default("User not found", 404);
    const passwordCompare = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!passwordCompare)
        throw new HttpException_1.default("Invalid Credentials", 400);
    const jwttoken = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, env_1.JWT_SECURED_KEY, {
        expiresIn: "2h",
    });
    const updateduser = yield prisma_1.default.user.update({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
        data: Object.assign(Object.assign({}, user), { token: jwttoken }),
    });
    return res.status(200).json({
        status: true,
        message: "User loged in sucessfully",
        data: {
            email: user.email,
            token: updateduser.token,
        },
    });
}));
exports.default = logincontroller;
