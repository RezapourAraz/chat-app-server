/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chats", (table) => {
    table.increments("id").primary();
    table.foreign("user_one").references("users.id");
    table.foreign("user_two").references("users.id");
    table.integer("user_one").index().unsigned().notNullable();
    table.integer("user_two").index().unsigned().notNullable();
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("chats");
};
