import { Router } from "express";
import validate from "../middleware/validation.middleware";
import {
  TaskCreateSchema,
  TaskUpdateSchema,
} from "../validators/task.validator";
import taskController from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/api/tasks",
  authMiddleware,
  validate(TaskCreateSchema),
  taskController.create
);
router.get("/api/tasks", authMiddleware, taskController.getTasks);
router.put(
  "/api/tasks/:id",
  authMiddleware,
  validate(TaskUpdateSchema),
  taskController.updateTask
);

router.delete(
  "api/tasks/:id",
  authMiddleware,
  validate(TaskUpdateSchema),
  taskController.deleteTask
);
const TaskRoutes = router;

export default TaskRoutes;
