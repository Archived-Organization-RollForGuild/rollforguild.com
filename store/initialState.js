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
        classes: {
          barbarian: {
            features: [],
            name: 'Barbarian',
            proficiencies: [],
          },
          bard: {
            features: [],
            name: 'Bard',
            proficiencies: [],
          },
          cleric: {
            features: [],
            name: 'Cleric',
            proficiencies: [],
          },
          druid: {
            features: [],
            name: 'Druid',
            proficiencies: [],
          },
          fighter: {
            features: [],
            name: 'Fighter',
            proficiencies: [],
          },
          monk: {
            features: [],
            name: 'Monk',
            proficiencies: [],
          },
          paladin: {
            features: [],
            name: 'Paladin',
            proficiencies: [],
          },
          ranger: {
            features: [],
            name: 'Ranger',
            proficiencies: [],
          },
          rogue: {
            features: [],
            name: 'Rogue',
            proficiencies: [],
          },
          sorcerer: {
            features: [],
            name: 'Sorcerer',
            proficiencies: [],
          },
          warlock: {
            features: [],
            name: 'Warlock',
            proficiencies: [],
          },
          wizard: {
            features: [],
            name: 'Wizard',
            proficiencies: [],
          },
        },
        races: {
          dragonborn: {
            modifiers: [],
            name: 'Dragonborn',
            subraces: [],
          },
          dwarf: {
            modifiers: [],
            name: 'Dwarf',
            subraces: [],
          },
          elf: {
            modifiers: [],
            name: 'Elf',
            subraces: [],
          },
          gnome: {
            modifiers: [],
            name: 'Gnome',
            subraces: [],
          },
          'half-elf': {
            modifiers: [],
            name: 'Half-Elf',
            subraces: [],
          },
          'half-orc': {
            modifiers: [],
            name: 'Half-Orc',
            subraces: [],
          },
          halfling: {
            modifiers: [],
            name: 'Halfling',
            subraces: [],
          },
          human: {
            modifiers: [],
            name: 'Human',
            subraces: [],
          },
          tiefling: {
            modifiers: [],
            name: 'Tiefling',
            subraces: [],
          },
        },
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
