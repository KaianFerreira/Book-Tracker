/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('log', table => {
      table.increments('id').primary()
      table.string('level').comment('level of log. warning, error, info, debug')
      table.string('from').comment('where log is from (api, web, etc)')
      table.text('message').comment('message of log')
      table.text('meta').comment('meta data of log if it has')
      table.text('stack').comment('stack trace of log')
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
