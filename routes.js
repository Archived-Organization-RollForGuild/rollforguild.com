const routes = require('next-routes')()





routes
  // About
  .add('about jobs', '/about/jobs', '/about/jobs')
  .add('about team', '/about/team', '/about/team')
  .add('about roadmap', '/roadmap', '/roadmap')

  // Account
  .add('account confirm', '/confirmation/:token', '/confirmations/account-confirm')
  .add('account login', '/login', '/login')
  .add('account logout', '/logout', '/logout')
  .add('account register', '/register', '/register')

  // Characters
  .add('character profile', '/my/characters/:id', '/my/character')

  // Email Updates
  .add('email update confirm', '/email-update-confirmation/:token', '/confirmations/email-update-confirm')
  .add('email update reject', '/email-rollback/:token', '/confirmations/email-update-confirm')

  // Groups
  .add('group create', '/groups/create', '/groups/create')
  .add('group manage', '/groups/manage', '/groups/manage')
  .add('group search', '/groups/search', '/groups/search')
  .add('group events', '/groups/:id/events', '/groups/events')
  .add('group join-requests', '/groups/:id/join-requests', '/groups/join-requests')
  .add('group members', '/groups/:id/members', '/groups/members')
  .add('group settings', '/groups/:id/settings', '/groups/settings')
  .add('group profile', '/groups/:id', '/groups/profile')

  // Password reset
  .add('password forgot', '/forgot-password', '/forgot-password')
  .add('password reset', '/reset(-password)?/:token?', '/reset-password')

  // Forums
  .add('forum thread create', '/forums/create', '/forums/create')
  .add('forum thread view', '/forums/thread/:id/:page?', '/forums/view')
  .add('forum list', '/forums/:page?', '/forums/list')

  // Users
  .add('user profile', '/users/:id', '/users/user')
  .add('user profile current', '/my/profile/:tab(details|groups|settings)?', '/users/user')

  // Administrative Documents
  .add('privacy policy', '/privacy-policy', '/privacy-policy')
  .add('terms and conditions', '/terms-and-conditions', '/terms-and-conditions')

  // Wordpress Fallback
  .add('wordpress proxy', '/:slug?', '/wordpress-proxy')





module.exports = routes
