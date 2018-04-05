const Hero = ({ children, gravity, src }) => {
  const style = {
    backgroundImage: `url(${src})`,
  }

  if (gravity) {
    style.backgroundPosition = gravity
  }

  return (
    <div
      className="hero"
      style={style}>
      {children}
    </div>
  )
}





export default Hero
