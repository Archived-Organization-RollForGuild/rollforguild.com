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

  rulesets: {
    'dnd-5e': {
      'player-characters': {
        classes: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
        races: ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'],
        'wizard-flow': ['race', 'class'],
      },
    },
  },

  user: {
    id: (typeof localStorage !== 'undefined') ? localStorage.getItem('userId') : null,
    loaded: false,
    loading: false,
    name: null,
  },
}
