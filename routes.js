const routes = require('next-routes')()





routes
  // Account
  .add('account confirm', '/confirmation/:token', '/confirmations/account-confirm')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Email Updates
  .add('email update confirm', '/email-update-confirmation/:token', '/confirmations/email-update-confirm')
  .add('email update reject', '/email-rollback/:token', '/confirmations/email-update-confirm')

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
  .add('forum thread view', '/forums/thread/:id/:page?', '/forums/view')

  // Users
  .add('user profile', '/users/:id', '/users/user')
  .add('user profile current', '/my/profile/:tab(details|groups|settings)?', '/users/user')





module.exports = routes
