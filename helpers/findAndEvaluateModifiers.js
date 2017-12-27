const arrowFunctionRegex = /^\(\({0,1}(.*)\){0,1}\s*=>\s*{{0,1}(.|\s)*}{0,1}\)$/gi




export default function findAndEvaluateModifiers (object) {
  // Loop through the object properties
  for (const key in object) {
    // Verify that this isn't a property from the prototype
    if ({}.hasOwnProperty.call(object, key)) {
      // If it's an arrow function, make it executable
      if (typeof object[key] === 'string' && arrowFunctionRegex.test(object[key])) {
        /* eslint-disable no-param-reassign, no-eval */
        object[key] = eval(object[key])
        /* eslint-enable */
      // If it's an object, recurse into it
      } else if (typeof object[key] === 'object') {
        findAndEvaluateModifiers(object[key])
      }
    }
  }
}
