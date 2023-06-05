/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("userName", 255).notNullable().unique();
    table.string("firstName", 255);
    table.string("lastName", 255);
    table.string("email", 255).notNullable().unique();
    table.string("profile", 255);
    table.string("phone", 255);
    table.string("password", 255).notNullable();
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
