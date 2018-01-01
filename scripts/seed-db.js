const faker = require('faker')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')





const characters = []
const classes = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard',
]
const races = [
  'Dragonborn',
  'Dwarf',
  'Elf',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Halfling',
  'Human',
  'Tiefling',
]
const users = []





// Generators
const generateAbilityScore = () => Math.ceil(Math.random() * 30)

const generateSkills = () => {
  const skillsByAbility = {
    charisma: ['deception', 'intimidation', 'performance', 'persuasion'],
    constitution: [],
    dexterity: ['acrobatics', 'sleight-of-hand', 'stealth'],
    intelligence: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    strength: ['athletics'],
    wisdom: ['animal-handling', 'insight', 'medicine', 'perception', 'survival'],
  }

  return Object.keys(skillsByAbility).reduce((accumulator, ability) => {
    /* eslint-disable no-param-reassign */
    for (const skill of skillsByAbility[ability]) {
      accumulator[skill] = { proficient: Math.random() >= 0.5 }
    }
    /* eslint-disable */

    return accumulator
  }, {})
}

const generateCharacter = userId => ({
  // background: '',
  // ethic: '',
  // experience: '',
  // moral: '',
  // name: '',
  // oClass: '',
  // race: '',
  class: classes[Math.floor(Math.random() * classes.length)],
  id: faker.random.uuid(),
  level: Math.ceil(Math.random() * 20),
  name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  owner: userId,
  race: races[Math.floor(Math.random() * races.length)],

  // Ability scores
  'ability-scores': {
    charisma: generateAbilityScore(),
    constitution: generateAbilityScore(),
    dexterity: generateAbilityScore(),
    intelligence: generateAbilityScore(),
    strength: generateAbilityScore(),
    wisdom: generateAbilityScore(),
  },

  // Skill proficiencies
  skills: generateSkills(),
})

const generateUser = () => ({
  id: faker.random.uuid(),
  name: faker.fake('{{name.firstName}} {{name.lastName}}'),
})





// Generate the entities
let usersToGenerate = 20
let charactersToGenerate = 100

while (usersToGenerate-- > 0) {
  users.push(generateUser())
}

while (charactersToGenerate-- > 0) {
  characters.push(generateCharacter(users[Math.floor(Math.random() * users.length)].id))
}





// Write the entities to disk
mkdirp.sync(path.resolve('data', 'users'))
mkdirp.sync(path.resolve('data', 'characters'))

for (const user of users) {
  fs.writeFileSync(path.resolve('data', 'users', `${user.id}.json`), JSON.stringify(user), 'utf8')
}

for (const character of characters) {
  fs.writeFileSync(path.resolve('data', 'characters', `${character.id}.json`), JSON.stringify(character, null, 2), 'utf8')
}
