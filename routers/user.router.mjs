import express from "express";
import { userRouterMiddleware } from "../middlewares/user-router.middleware.mjs";
import { logger } from "../utils/logger.util.mjs";

const userRouter = express.Router();

userRouter.use(userRouterMiddleware);

//dashboard
userRouter.get("/dashboard", (req, res) => {
  res.end("dashboard");
});

export { userRouter };
