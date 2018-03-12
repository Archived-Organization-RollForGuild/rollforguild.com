const routes = (module.exports = require('next-routes')())

routes
  // Account
  .add('account confirmation', '/confirmation/:token', '/confirmation')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Groups
  .add('group create', '/groups/create', '/groups/create')
  .add('group manage', '/groups/manage', '/groups/manage')
  .add('group profile', '/groups/:id', '/groups/group')
  .add('group search', '/groups/search', '/groups/search')

  // Users
  .add('user profile', '/users/:id', '/users/user')
  .add('user profile current', '/my/profile', '/users/user')
