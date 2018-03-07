const routes = (module.exports = require('next-routes')())

routes
  // Account
  .add('account confirmation', '/confirmation/:token', '/confirmation')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Groups
  .add('create group', '/groups/create', '/groups/create')
  .add('manage group', '/groups/manage', '/groups/manage')
  .add('group search', '/groups/search', '/groups/search')
  .add('group profile', '/groups/:id', '/groups/group')

  // Password reset
  .add('password reset', '/reset(-password)?/:token?', '/reset-password')

  // Users
  .add('view user', '/users/:id', '/users/user')
  .add('view current user', '/my/profile', '/users/user')
