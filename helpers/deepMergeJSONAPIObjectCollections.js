export default function deepMergeJSONAPIObjectCollections(curObjects, _newObjects) {
  let newObjects = _newObjects

  if (!Array.isArray(newObjects)) {
    newObjects = Object.values(newObjects)
  }

  newObjects = newObjects.reduce((accumulator, obj) => {
    let newObj = obj

    if (curObjects[newObj.id]) {
      const curObj = { ...curObjects[newObj.id] }

      newObj = {
        ...curObj,
        ...newObj,
        attributes: {
          ...curObj.attributes,
          ...newObj.attributes,
        },
        ...(curObj.relationships || newObj.relationships ? {
          relationships: {
            ...(curObj.relationships || {}),
            ...(newObj.relationships || {}),
          },
        } : {}),
      }
    }

    return {
      ...accumulator,
      [newObj.id]: newObj,
    }
  }, {})

  return {
    ...curObjects,
    ...newObjects,
  }
}
