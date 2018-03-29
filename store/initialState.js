import Cookies from 'js-cookie'

export default {

  alerts: {},

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

  forums: {
    threads: {},
    comments: {},
  },

  users: {},
}
