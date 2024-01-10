"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const auth_validator_1 = require("../validators/auth.validator");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post("/login", (0, validation_middleware_1.default)(auth_validator_1.LoginSchema), auth_controller_1.default);
const authRouter = router;
exports.default = authRouter;
