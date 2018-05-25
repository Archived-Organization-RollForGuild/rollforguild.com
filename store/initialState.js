export default {
  // Active alert objects,
  alerts: {},

  // Authentication state flags
  authentication: {
    loggedIn: false,
    verifyError: false,
    userId: null,
  },

  // Avatar image data
  avatars: {
    groups: {},
    users: {},
  },

  // User character data *Unused*
  characters: {},

  // Group event data
  events: {},

  // Game data for user, group, and event pages
  games: {},

  // Group data
  groups: {},

  // Game ruleset data *Unused*
  rulesets: {},

  // Threads and comments of the public forums
  forums: {
    threads: {},
    comments: {},
  },

  // User data
  users: {},

  // Pending request data made by store action creators.
  __pending: {},
}
