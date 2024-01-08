import { Router } from "express";
import { UserCreateSchema } from "../validators/user.validator";
import validate from "../middleware/validation.middleware";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/users", validate(UserCreateSchema), UserController.create);
router.get("/users", UserController.get);

const UserRoutes = router;

export default UserRoutes;
