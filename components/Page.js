// Module imports
import { bindActionCreators } from 'redux'
import Cookies from 'next-cookies'
import LocalForage from 'localforage'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import fontawesome from '@fortawesome/fontawesome'
import {
  faBars,
  faBug,
  faCheck,
  faCopy,
  faEnvelope,
  faEye,
  faEyeSlash,
  faInfoCircle,
  faThumbsUp,
  faTimes,
  faExclamationCircle,
  faExclamationTriangle,
  faLock,
  faKey,
  faMapMarker,
  faSpinner,
  faSearch,
  faUser,
} from '@fortawesome/fontawesome-free-solid'
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/fontawesome-free-brands'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import { Router } from '../routes'
import AlertsController from './AlertsController'
import apiService from '../services/api'
import Banner from './Banner'
import Head from './Head'

/* eslint-disable no-unused-expressions */
preval`if (process.env.NODE_ENV === 'production') require('../workers/offline')`
/* eslint-enable */





// Component constants
initStore()





export default (Component, title = 'Untitled', reduxOptions = {}, authenticationRequired = false) => {
  class Page extends React.Component {
    constructor (props) {
      super(props)

      fontawesome.library.add(
        // Solids
        faBars,
        faBug,
        faCheck,
        faCopy,
        faEnvelope,
        faEye,
        faEyeSlash,
        faKey,
        faInfoCircle,
        faThumbsUp,
        faTimes,
        faExclamationCircle,
        faExclamationTriangle,
        faLock,
        faMapMarker,
        faSpinner,
        faSearch,
        faUser,

        // Brands
        faFacebook,
        faInstagram,
        faTwitter,
      )

      LocalForage.config({
        name: 'Roll for Guild',
        storeName: 'webStore',
      })

      if (props.accessToken) {
        apiService.defaults.headers.common.Authorization = `Bearer ${props.accessToken}`
      }
    }

    static async getInitialProps (ctx) {
      const {
        asPath,
        isServer,
        query,
        res,
      } = ctx
      const {
        accessToken,
        userId,
      } = Cookies(ctx)
      let props = {}

      if (accessToken) {
        apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      }

      if (!accessToken && authenticationRequired) {
        if (res) {
          res.writeHead(302, {
            Location: `/login?destination=${encodeURIComponent(asPath)}`,
          })
          res.end()
          res.finished = true
        } else {
          Router.replace(`/login?destination=${encodeURIComponent(asPath)}`)
        }

        return {}
      }

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
      return (
        <div role="application">
          <input
            hidden
            id="application-banner-control"
            type="checkbox" />

          <Head title={title} />

          <Banner path={this.props.asPath} />

          <Component {...this.props} />

          <AlertsController />
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
