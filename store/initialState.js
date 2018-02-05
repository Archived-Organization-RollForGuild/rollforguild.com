import Cookies from 'js-cookie'

export default {
  authentication: {
    loggedIn: !!Cookies.get('accessToken'),
    registered: false,
  },

  character: {
    character: null,
    loaded: false,
    loading: false,
  },

  characters: {
    characters: [],
    loaded: false,
    loading: false,
  },

  groups: {},

  rulesets: {},

  user: {
    email: null,
    id: null,
    loaded: false,
    loading: false,
    username: null,
  },
}
