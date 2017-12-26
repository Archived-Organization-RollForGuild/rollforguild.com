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
    Charisma: ['Deception', 'Intimidation', 'Performance', 'Persuasion'],
    Constitution: [],
    Dexterity: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
    Intelligence: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'],
    Strength: ['Athletics'],
    Wisdom: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
  }

  return Object.keys(skillsByAbility).reduce((accumulator, ability) => accumulator.concat(skillsByAbility[ability].map(skill => ({
    ability: ability.toLowerCase(),
    name: skill,
    proficient: Math.random() > 0.5,
  }))), [])
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
  abilities: {
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
  fs.writeFileSync(path.resolve('data', 'characters', `${character.id}.json`), JSON.stringify(character), 'utf8')
}
