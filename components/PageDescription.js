// Module imports
import NextHead from 'next/head'





export default ({ children }) => {
  if (children.length > 300) {
    console.error(`Page description is too long! The description should be 50-300 characters long, but this page's description is ${children.length} characters.`)
  }

  if (children.indexOf('"') !== -1) {
    console.error('Page descriptions shouldn\'t contain double quotes.')
  }

  return (
    <NextHead>
      <meta name="description" content={children} />
      <meta property="og:description" content={children} />
    </NextHead>
  )
}
