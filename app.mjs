import * as cluster from "node:cluster";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import { logger } from "./utils/logger.util.mjs";
import { configs } from "./configs.mjs";
import { rateLimiter } from "./middlewares/rate-limit.middleware.mjs";

import { userRouter } from "./routers/user.router.mjs";
import expressEjsLayouts from "express-ejs-layouts";
import { globalMiddleware } from "./middlewares/global.middleware.mjs";
import { notFound404Controller } from "./controllers/404.controller.mjs";
import { internalError500 } from "./controllers/500.controller.mjs";
import {demo} from './routers/demo.router.mjs'
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static(configs.PUBLICDIR));
app.use(
  session({
    secret: configs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 }, // 1 menit
  })
);
app.use(flash());
app.use(rateLimiter);
app.use(expressEjsLayouts)

//set app
app.set("view engine", "ejs");
app.set("views", configs.VIEWSDIR);

app.use((req, res, next) => {
  next();
});


app.use(globalMiddleware)
app.use("/user", userRouter);
app.use('/demo', demo)
// @ts-ignore
app.get(`/`, (req, res) => {
  return res.render("index", configs.EJSDATA({
    nama: 'anto'
  }));
  // return res.send( `ytdlpgui project under construction!` );
});


app.use(notFound404Controller);
app.use(internalError500);

if (cluster.default.isPrimary) {
  app.listen(configs.PORT, () => {
    logger.info(`app.mjs only running on port ${configs.PORT}...`);
  });
}



export { app };
