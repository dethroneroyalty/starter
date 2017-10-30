import Sequelize from "sequelize";
import makeDebug from "debug";

const debug = makeDebug("fuckapp:sequelize");

export default async function setSequelize(app) {
  const { database, password, user, host } = app.get("config").pg;

  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  });

  await sequelize.authenticate();

  debug;

  app.set("sequelize", sequelize);
}
