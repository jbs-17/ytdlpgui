import dotenv from "dotenv";
dotenv.config();

export const configs = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  LOGSDIR: "./logs",
  PUBLICDIR: "./public",
  VIEWSDIR: "./views",
  EJSDATA: function (data = {}) {
    const safeData = new Proxy(
      {
        title: "Page",
        appname: "YTDLPGUI",
        ...data,
      },
      {
        get: (target, prop) => target[prop] ?? "",
      }
    );

    return {
      layout: "layouts/main.layout.ejs",
      data: safeData,
      get(key) {
        return safeData[key];
      },
    };
  },
};
