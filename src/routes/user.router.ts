import { Router } from "express";
import {
  UserCreateSchema,
  UserUpdateSchema,
} from "../validators/user.validator";
import validate from "../middleware/validation.middleware";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/api/auth/register",
  validate(UserCreateSchema),
  UserController.create
);
router.get("/users", UserController.get);
// router.put("/users/:userID", validate(UserUpdateSchema), UserController.update);
router.get("/api/", authMiddleware, UserController.getProfile);
router.delete("/api/users/:userID", UserController.deleteUser);

const UserRoutes = router;

export default UserRoutes;
