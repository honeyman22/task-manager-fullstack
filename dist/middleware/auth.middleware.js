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
exports.authMiddleware = void 0;
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const prisma_1 = __importDefault(require("../prisma"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Bearer");
        if (!token)
            throw new HttpException_1.default("Access denied (Invalid token)", 401);
        const decode = yield jsonwebtoken_1.default.verify(token, env_1.JWT_SECURED_KEY, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw new HttpException_1.default("Invalid Token! Token expired", 400);
            if (!decode)
                throw new HttpException_1.default("Invalid Token! Token expired", 400);
            const jwtPayload = decode;
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    id: jwtPayload._id,
                },
            });
            if (!user)
                throw new HttpException_1.default("Access denied (Invalid token)", 401);
            res.locals.user = user;
            return next();
        }));
    }
    catch (err) {
        return next(err);
    }
});
exports.authMiddleware = authMiddleware;
