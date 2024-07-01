import { Router } from "express";
import { validate } from "../middlewares/zod";
import { AuthUserSchema } from "../utils/zod/user";
import { create, start, ping } from "../controllers/user";
import { checkHttpUserAuthentication } from "../middlewares/http.auth";

const userRoutes = Router()

userRoutes.get("/ping", checkHttpUserAuthentication, (req, res) => ping(req, res));
userRoutes.post("/user/session-start", validate(AuthUserSchema), (req, res) => start(req, res));
userRoutes.post("/user/new-account", validate(AuthUserSchema), (req, res) => create(req, res));

export default userRoutes;