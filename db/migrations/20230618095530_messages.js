/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("content", 255);
    table.foreign("chat_id").references("chats.id");
    table.foreign("sender_id").references("users.id");
    table.integer("chat_id").index().unsigned().notNullable();
    table.integer("sender_id").index().unsigned().notNullable();
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
