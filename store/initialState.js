export default {
  authentication: {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    registering: false,
  },

  characters: {
    characters: [],
    loaded: false,
    loading: false,
  },

  user: {
    id: (typeof localStorage !== 'undefined') ? localStorage.getItem('userId') : null,
    loaded: false,
    loading: false,
    name: null,
  },
}
