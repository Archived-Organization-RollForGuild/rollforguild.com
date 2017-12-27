export default {
  authentication: {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    registering: false,
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

  rulesets: {},

  user: {
    id: (typeof localStorage !== 'undefined') ? localStorage.getItem('userId') : null,
    loaded: false,
    loading: false,
    name: null,
  },
}
