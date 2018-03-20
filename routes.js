const routes = require('next-routes')()





routes
  // Account
  .add('account confirm', '/confirmation/:token', '/confirmations/account-confirm')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Groups
  .add('group create', '/groups/create', '/groups/create')
  .add('group manage', '/groups/manage', '/groups/manage')
  .add('group search', '/groups/search', '/groups/search')
  .add('group profile', '/groups/:id', '/groups/group')

  // Password reset
  .add('password reset', '/reset(-password)?/:token?', '/reset-password')

  // Users
  .add('user profile', '/users/:id', '/users/user')
  .add('user profile current', '/my/profile', '/users/user')





module.exports = routes
