import knex from 'knex';

export default function setKnex(app) {
  const conn = knex({
    client: "pg",
    pool: {
      min: 0,
      max: 10,
    }
  });

  app.set("knex", conn);
}
