import express from "express";
import path from "path";
import morgan from "morgan";
import config from "config";

import setLogger from "./logger";
import setRoutes from "./routes";
import setSession from "./session";
import setSequelize from "./sequelize";
import setModels from "./models";

export default async function init() {
  const app = express();

  app.set("config", config);

  setLogger(app);

  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  await setSequelize(app);
  setSession(app);
  await setModels(app);
  setRoutes(app);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  return app;
}
