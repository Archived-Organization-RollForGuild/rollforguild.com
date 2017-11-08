// Module imports
import { bindActionCreators } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import Head from './Head'





// Component constants
const store = initStore()





export default (Component, title = 'Untitled', reduxOptions = {}) => {
  class Page extends React.Component {
    static async getInitialProps(ctx) {
      let {
        asPath,
        isServer,
        query,
      } = ctx
      let props = {}

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx)
      }

      return {
        asPath,
        isServer,
        query,
        ...props
      }
    }

    render() {
      let {
        isServer,
        path,
      } = this.props
      let mainClasses = ['fade-in', 'page', title.toLowerCase().replace(' ', '-')].join(' ')

      return (
        <div role="application">
          <Head title={title} />

          <main className={mainClasses}>
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  let mapDispatchToProps = reduxOptions.mapDispatchToProps

  if (Array.isArray(reduxOptions.mapDispatchToProps)) {
    mapDispatchToProps = dispatch => {
      let actionMap = {}

      for (let actionName of reduxOptions.mapDispatchToProps) {
        actionMap[actionName] = bindActionCreators(actions[actionName], dispatch)
      }

      return actionMap
    }
  }

  return withRedux(initStore, reduxOptions.mapStateToProps, mapDispatchToProps)(Page)
}
