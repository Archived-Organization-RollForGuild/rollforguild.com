import Cookies from 'js-cookie'

export default {
  authentication: {
    loggedIn: !!Cookies.get('accessToken'),
  },

  characters: {},

  groups: {},

  rulesets: {},

  users: {},
}

