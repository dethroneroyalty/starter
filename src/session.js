import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);
const { REDIS_HOST, SESSION_SECRET } = process.env;

export default function setSession(app) {
  const { error } = app.get("logger");

  const store = new RedisStore({
    host: REDIS_HOST,
    port: 6379
  });

  store.on("disconnect", err => {
    error(err.toString());
  });

  const config = {
    secret: SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    config.cookie = { secure: true };
    config.proxy = true;
  }

  app.use(session(config));
}
