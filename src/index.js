import debugMake from "debug";
import http from "http";
import init from "./app";

const debug = debugMake("fuckapp:index");

init().then(
  app => {
    const server = http.createServer(app);
    const port = app.get("config").port;

    server.listen(port);

    server.on("error", onError);
    server.on("listening", onListening);

    process.on("unhandledRejection", e => {
      debug("unhandledRejection", e);
    });

    function onError(error) {
      if (error.syscall !== "listen") {
        throw error;
      }

      var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          debug(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          debug(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    function onListening() {
      var addr = server.address();
      var bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
      debug("Listening on " + bind);
    }
  },
  () => {
    process.exit(1);
  }
);
