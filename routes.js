const routes = require('next-routes')()





routes
  // Account
  .add('account confirmation', '/confirmation/:token', '/confirmation')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Groups
  .add('group create', '/groups/create', '/groups/create')
  .add('group manage', '/groups/manage', '/groups/manage')
  .add('group search', '/groups/search', '/groups/search')
  .add('group profile', '/groups/:id', '/groups/group')

  // Password reset
  .add('password reset', '/reset(-password)?/:token?', '/reset-password')

  // Forums
  .add('forum list', '/forums/:page?', '/forums/list')
  .add('forum thread create', '/forums/create', '/forums/create')
  .add('forum thread view', '/forums/thread/:id', '/forums/view')

  // Users
  .add('user profile', '/users/:id', '/users/user')
  .add('user profile current', '/my/profile', '/users/user')





module.exports = routes
