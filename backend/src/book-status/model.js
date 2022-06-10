import knex from '../../config/knex'

// Get Books
export const getAll = () => {
  return knex('book_status').orderBy('created_at', 'desc')
}

export const get = (id) => {
  return knex('book_status').where('id', id).first()
}

export const create = (
  name
) => {
  return knex('book_status').insert({ name }).returning('id')
}

export const update = (
  id,
  name
) => {
  return knex('book_status').where('id', id).update({ name }).returning(['id', 'name'])
}

export const remove = (id) => {
  return knex('book_status').where('id', id).del().returning('id')
}
