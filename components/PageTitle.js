/* eslint no-console: off */
// Module imports
import NextHead from 'next/head'





export default ({ children }) => {
  const title = `${children} | Roll for Guild`

  if (title.length > 50) {
    console.warn(`Page titles should be fewer than 60 characters, preferably closer to 50. This page's title is ${title.length} characters.`)
  }

  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={children} />
    </NextHead>
  )
}
