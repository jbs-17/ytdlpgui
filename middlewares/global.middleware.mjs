import express from "express";
import { logger } from "../utils/logger.util.mjs";

export async function globalMiddleware(
  req = express.request,
  res = express.response,
  next
) {
  const start = Date.now();
  res.on("finish", () => {
    const finish = Date.now();
    const time = finish - start;
    logger.http("response close", { start, finish, time });
  });
  logger.http('new request...', {ip: req.ip, path: req.path })
  next();
}
