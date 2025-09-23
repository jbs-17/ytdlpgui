import express from "express";
import { configs } from "../configs.mjs";

export async function notFound404Controller(
  req = express.request,
  res = express.response,
  next
) {
  const title = `${req.path} Not Found`;
  try {
    res.render(
      "404.ejs",
      configs.EJSDATA({
        title,
        path: req.path,
        referer: req.headers.referer ?? '/'
      })
    );
  } catch (error) {
    next(error);
  }
}
