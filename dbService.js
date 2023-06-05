const knex = require("knex");

const knexConfig = require("./knexfile");

const connection = knex(knexConfig["development"]);

connection.raw("SELECT VERSION()").then(() => {
  console.log("connection successful");
});

module.exports = connection;
