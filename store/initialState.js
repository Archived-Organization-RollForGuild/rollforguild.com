import Cookies from 'js-cookie'

export default {
  authentication: {
    loggedIn: !!Cookies.get('accessToken'),
  },

  avatars: {
    groups: {},
    users: {},
  },

  characters: {},

  groups: {},

  rulesets: {},

  users: {},
}
