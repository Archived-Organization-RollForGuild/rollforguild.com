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
        'ability-scores': {
          charisma: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Charisma',
          },
          constitution: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Constitution',
          },
          dexterity: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Dexterity',
          },
          intelligence: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Intelligence',
          },
          strength: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Strength',
          },
          wisdom: {
            base: 8,
            max: 30,
            min: 1,
            modifier: score => Math.floor((score - 10) / 2),
            name: 'Wisdom',
          },
        },
        classes: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
        races: ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'],
        'wizard-flow': ['race', 'class', 'ability-scores'],
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
