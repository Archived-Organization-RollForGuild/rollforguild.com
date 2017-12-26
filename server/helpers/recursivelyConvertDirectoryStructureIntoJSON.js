// Module imports
const fs = require('fs')
const path = require('path')





module.exports = function recursivelyConvertDirectoryStructureIntoJSON (directory) {
  const directoryContents = fs.readdirSync(directory)
  const response = {}

  for (const item of directoryContents) {
    const itemPath = path.resolve(directory, item)
    const itemName = item.replace(path.extname(item), '')

    if (fs.lstatSync(itemPath).isDirectory()) {
      response[itemName] = recursivelyConvertDirectoryStructureIntoJSON(itemPath)
    } else {
      response[itemName] = JSON.parse(fs.readFileSync(itemPath, 'utf8'))
    }
  }

  return response
}
