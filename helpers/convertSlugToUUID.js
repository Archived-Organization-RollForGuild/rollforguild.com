import uuidv5 from 'uuid/v5'





export default function convertSlugtoUUID (slug, entityType) {
  return uuidv5(slug, uuidv5(`https://rollforguild.com/${entityType}/`, uuidv5.URL))
}
