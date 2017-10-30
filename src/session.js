import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

export default function setSession(app) {
  const { error } = app.get("logger");
  const { redis_host, session_secret } = app.get("config");

  const store = new RedisStore({
    host: redis_host,
    port: 6379
  });

  store.on("disconnect", err => {
    error(err.toString());
  });

  const config = {
    secret: session_secret,
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
