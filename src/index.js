import debugMake from "debug";
import http from "http";
import app from "./app";

const debug = debugMake("fuckapp:index");
const { PORT } = process.env;

const server = http.createServer(app);

server.listen(PORT);

server.on("error", onError);
server.on("listening", onListening);

process.on("unhandledRejection", e => {
  debug("unhandledRejection", e);
  process.exit(1);
});

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

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
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
