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

  // Users
  .add('view user', '/users/:id', '/users/user')
  //.add('manage user', '/users/:id/edit', '/users/edit') added as placeholder. Disabled until user permisssion groups are added. This endpoint will be used as an admin control endpoint.
  .add('view current user', '/my/profile', '/users/user')
  .add('manage current user', '/my/profile/edit', '/users/edit')
