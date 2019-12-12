var knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Sovelto1",
    database: "postgres"
  }
});

module.exports = knex;
