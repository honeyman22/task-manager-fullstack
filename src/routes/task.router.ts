import { Router } from "express";
import validate from "../middleware/validation.middleware";
import {
  TaskCreateSchema,
  TaskUpdateSchema,
} from "../validators/task.validator";
import taskController from "../controllers/task.controller";

const router = Router();

router.post("/tasks", validate(TaskCreateSchema), taskController.create);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id", validate(TaskUpdateSchema), taskController.updateTask);
const TaskRoutes = router;

export default TaskRoutes;
