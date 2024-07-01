"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("../middlewares/zod");
const user_1 = require("../utils/zod/user");
const user_2 = require("../controllers/user");
const http_auth_1 = require("../middlewares/http.auth");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/ping", http_auth_1.checkHttpUserAuthentication, (req, res) => (0, user_2.ping)(req, res));
userRoutes.post("/user/session-start", (0, zod_1.validate)(user_1.AuthUserSchema), (req, res) => (0, user_2.start)(req, res));
userRoutes.post("/user/new-account", (0, zod_1.validate)(user_1.AuthUserSchema), (req, res) => (0, user_2.create)(req, res));
exports.default = userRoutes;
