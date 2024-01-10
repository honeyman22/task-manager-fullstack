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
  "/tasks",
  authMiddleware,
  validate(TaskCreateSchema),
  taskController.create
);
router.get("/tasks", authMiddleware, taskController.getTasks);
router.put(
  "/tasks/:id",
  authMiddleware,
  validate(TaskUpdateSchema),
  taskController.updateTask
);
const TaskRoutes = router;

export default TaskRoutes;
