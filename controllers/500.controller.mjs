import express from "express";
import { configs } from "../configs.mjs";


export async function internalError500(req = express.request, res=express.response) {
  try {
    res.render('500.ejs', configs.EJSDATA({
      title: "Error",
      path: req.path,
      
    }))
  } catch {
    res.json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}