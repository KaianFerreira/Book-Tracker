/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defaultStatus = [{ name: 'Quero ler'}, { name: 'Lendo'}, { name: 'Lido'}]

exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('book_status', function(table) {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  ]).then(() => Promise.all([
    knex('book_status').insert(defaultStatus)
  ]).then(() => Promise.all([
    knex.schema.createTable('book', (table) => {
      table.increments()
      table.string('title').notNullable().comment('Book title')
      table.string('author').notNullable().comment('Book author')
      table.date('finish_date').comment('Book finish date')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.integer('rate').defaultTo(0)
      table.integer('status').unsigned()
      table.foreign('status').references('book_status.id').onDelete('CASCADE')
      table.string('cover').comment('Book cover')
    }),
  ])))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('book')
  ])
  .then(() => Promise.all([
    knex.schema.dropTableIfExists('book_status')
  ]))
}
