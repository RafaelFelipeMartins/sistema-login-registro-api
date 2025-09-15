import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('usuarios', function (table) {
      table.increments('id').primary();
      table.string('nome', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('senha_hash', 255).notNullable();
      table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable('usuarios')
}

