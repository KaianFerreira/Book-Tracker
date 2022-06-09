/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('log', table => {
      table.increments('id').primary()
      table.string('level')
      table.string('from')
      table.text('message')
      table.text('meta')
      table.text('stack')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable('log')])
}
