export default function formatGameString (value) {
  let versionString = value.attributes.version

  // If the version is just a number, append an e (for edition).
  if (!Number.isNaN(+versionString)) {
    versionString = `${versionString}e`
  }

  return `${value.attributes.name} ${versionString}`
}
