const Main = props => (
  <main className={['fade-in', 'page', props.title.toLowerCase().replace(/\s/g, '-')].join(' ')}>
    {props.children}
  </main>
)





export default Main
