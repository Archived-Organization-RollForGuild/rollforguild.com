// Module imports
import { bindActionCreators } from 'redux'
import Cookies from 'next-cookies'
import LocalForage from 'localforage'
import React from 'react'
import withRedux from 'next-redux-wrapper'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import { Router } from '../routes'
import Banner from './Banner'
import Head from './Head'

/* eslint-disable no-unused-expressions */
preval`if (process.env.NODE_ENV === 'production') require('../helpers/offline')`
/* eslint-enable */





// Component constants
initStore()





export default (Component, title = 'Untitled', reduxOptions = {}, authenticationRequired = false) => {
  class Page extends React.Component {
    componentWillMount () {
      const {
        accessToken,
        asPath,
      } = this.props

      if (authenticationRequired && !accessToken) {
        return Router.replace(`/login?destination=${encodeURIComponent(asPath)}`)
      }

      if (Component.componentWillMount) {
        Component.componentWillMount()
      }

      return true
    }

    constructor (props) {
      super(props)

      LocalForage.config({
        name: 'Roll for Guild',
        storeName: 'webStore',
      })
    }

    static async getInitialProps(ctx) {
      const {
        asPath,
        isServer,
        query,
      } = ctx
      const {
        accessToken,
        userId,
      } = Cookies(ctx)
      let props = {}

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx)
      }

      return {
        accessToken,
        asPath,
        isServer,
        query,
        userId,
        ...props,
      }
    }

    render () {
      const mainClasses = ['fade-in', 'page', title.toLowerCase().replace(/\s/g, '-')].join(' ')

      return (
        <div role="application">
          <Head title={title} />

          <Banner path={this.props.asPath} />

          <main className={mainClasses}>
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  const { mapStateToProps } = reduxOptions || {}
  let { mapDispatchToProps } = reduxOptions || {}

  if (Array.isArray(mapDispatchToProps)) {
    mapDispatchToProps = dispatch => {
      const actionMap = {}

      for (const actionName of (reduxOptions || {}).mapDispatchToProps) {
        actionMap[actionName] = bindActionCreators(actions[actionName], dispatch)
      }

      return actionMap
    }
  }

  return withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page)
}
