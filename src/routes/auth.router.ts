import { Router } from "express";
import validate from "../middleware/validation.middleware";
import { LoginSchema } from "../validators/auth.validator";
import logincontroller from "../controllers/auth.controller";

const router = Router();

router.post("/login", validate(LoginSchema), logincontroller);

const authRouter = router;
export default authRouter;
