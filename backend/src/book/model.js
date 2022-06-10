import knex from '../../config/knex'

// Get Books
export const getAll = () => {
  return knex('book').orderBy('created_at', 'desc')
}

export const get = (id) => {
  return knex('book').where('id', id).first()
}

export const create = (
  title,
  author,
  finishDate,
  rate,
  status,
  cover = null
) => {
  return knex('book').insert({
    title,
    author,
    finishDate,
    rate,
    status,
    cover
  }).returning('id')
}

export const update = (
  id,
  title,
  author,
  finishDate,
  rate,
  status,
  cover = null
) => {
  return knex('book').where('id', id).update({
    title,
    author,
    finishDate,
    rate,
    status,
    cover
  }).returning('id')
}

export const updateStatus = (id, status) => {
  return knex('book').where('id', id).update({
    status
  }).returning(['id', 'status'])
}

export const remove = (id) => {
  return knex('book').where('id', id).del()
}
