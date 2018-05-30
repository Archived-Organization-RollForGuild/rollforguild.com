const Main = ({ children, className, title }) => {
  const classes = ['fade-in', 'page']

  classes.push(title.toLowerCase().replace(/\s/g, '-'))

  if (className) {
    classes.push(className)
  }

  return (
    <main className={classes.join(' ')}>
      {children}
    </main>
  )
}





export default Main
