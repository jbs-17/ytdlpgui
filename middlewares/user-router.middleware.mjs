// @ts-nocheck
import express from "express";

export async function userRouterMiddleware(
  req = express.request,
  res = express.Response,
  next
) {
  next();
}
