"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validator_1 = require("../validators/user.validator");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/users", (0, validation_middleware_1.default)(user_validator_1.UserCreateSchema), user_controller_1.default.create);
router.get("/users", user_controller_1.default.get);
router.put("/users/:userID", (0, validation_middleware_1.default)(user_validator_1.UserUpdateSchema), user_controller_1.default.update);
router.get("/", auth_middleware_1.authMiddleware, user_controller_1.default.getProfile);
router.delete("/users/:userID", user_controller_1.default.deleteUser);
const UserRoutes = router;
exports.default = UserRoutes;
