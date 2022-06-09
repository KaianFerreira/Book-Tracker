/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('user', table => {
			table.increments('id').primary()
			table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.string('hash').notNullable().unique()
		})
	])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('user')])
}
