import knex from '../../config/knex'

// Get logs
const get = (iniDate, endDate, from = null, level = null) => {
  const query = knex('log')
    .select(
      'id',
      knex.raw('TO_CHAR(date, \'DD/MM/YYYY HH24:MI:SS\') AS date_fmt'),
      'from',
      'level',
      'message',
      'stack'
    )
    .where('date', '>=', iniDate)
    .andWhere('date', '<=', endDate)
    .orderBy('date', 'desc')
  if (from) query.andWhere('from', from) 
  if (level) query.andWhere('level', level)
  return query
}

// Create log
const create = (
  from,
  level,
  message,
  stack
) => {
  return knex('log').insert({
    from,
    level,
    message,
    stack
  })
}

export {
  get,
  create
}
