import express from "express";
import path from "path";
import morgan from "morgan";

import setLogger from "./logger";
import setRoutes from "./routes";
import setSession from "./session";
import setModels from "./models";

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setLogger(app);
setSession(app);
setModels(app);
setRoutes(app);

// eslint-disable-next-line
app.use("/", (err, req, resp, next) => {
  const stack = err.stack.split(/[\n\t\r]/g);
  const message = stack.shift();
  resp.json({ error: { message, stack } });
});

export default app;
