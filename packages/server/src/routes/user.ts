import { Router } from "express";
import { validate } from "../middlewares/zod";
import { AuthUserSchema } from "../utils/zod/user";
import { start } from "../controllers/user";

const userRoutes = Router()

userRoutes.post("/user/session-start", validate(AuthUserSchema), (req, res) => start(req, res));

export default userRoutes;