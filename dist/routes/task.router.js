"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const task_validator_1 = require("../validators/task.validator");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/tasks", auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(task_validator_1.TaskCreateSchema), task_controller_1.default.create);
router.get("/tasks", auth_middleware_1.authMiddleware, task_controller_1.default.getTasks);
router.put("/tasks/:id", auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(task_validator_1.TaskUpdateSchema), task_controller_1.default.updateTask);
router.delete("/tasks/:id", auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(task_validator_1.TaskUpdateSchema), task_controller_1.default.deleteTask);
const TaskRoutes = router;
exports.default = TaskRoutes;
