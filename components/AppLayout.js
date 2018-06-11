
// Module imports
import { bindActionCreators } from 'redux'
import React from 'react'
import Cookies from 'next-cookies'
import ErrorPage from 'next/error'



// Component imports
import { actions } from '../store'
import { Router } from '../routes'
import apiService from '../services/api'
import AlertsController from './AlertsController'
import Banner from './Banner'
import connect from '../helpers/connect'
import Head from './Head'





class AppLayout extends React.Component {
  static async _verifyUserSession ({ verifySession, logout, accessToken }) {
    const { payload, status } = await verifySession(accessToken)

    // If the API returned in error, double check the reasoning.
    if (status !== 'success') {
      if (payload && Array.isArray(payload.errors)) {
        const errMsg = payload.errors[0] && payload.errors[0].detail

        if (errMsg === 'Unable to locate session') {
          await logout(true)
          return false
        }
      }
      // Something else went wrong, but we cannot determine if the session is invalid
      return true
    }

    return true
  }

  static async _initUserSession (ctx) {
    const {
      store,
    } = ctx

    const {
      authentication: {
        loggedIn,
        verifyError,
      },
      users,
    } = store.getState()

    const verifySession = (...args) => actions.verifySession(...args)(store.dispatch)
    const logout = (...args) => actions.logout(...args)(store.dispatch)

    const {
      accessToken,
      userId,
    } = Cookies(ctx)

    let verified = loggedIn && !verifyError

    if (accessToken) {
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      if (!verified) {
        verified = await AppLayout._verifyUserSession({
          accessToken,
          verifySession,
          logout,
        })
      }
    }

    if (!verified) {
      return {}
    }

    if (!users[userId]) {
      // Preload user data if it hasn't been loaded already.
      await actions.getUser(userId)(store.dispatch)
    }

    return {
      accessToken,
      userId,
    }
  }

  static async getInitialProps ({ Component, ctx }) {
    const {
      res,
      asPath,
      isServer,
      query,
    } = ctx

    const { accessToken, userId } = await AppLayout._initUserSession(ctx)

    if (!accessToken && Component.authenticationRequired) {
      if (res) {
        res.writeHead(302, {
          Location: `/?authenticate=true&destination=${encodeURIComponent(asPath)}`,
        })
        res.end()
        res.finished = true
      } else {
        Router.replace(`/?authenticate=true&destination=${encodeURIComponent(asPath)}`)
      }

      return null
    }

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let statusCode = 200

    if (ctx.res) {
      ({ statusCode } = ctx.res)
    }

    return {
      accessToken,
      userId,
      statusCode,
      pageProps: {
        asPath,
        isServer,
        query,
        userId,
        ...pageProps,
      },
    }
  }

  constructor (props) {
    super(props)

    if (this.props.verifyError) {
      this.props.logout(true)
    } else if (this.props.accessToken && this.props.loggedIn) {
      apiService.defaults.headers.common.Authorization = `Bearer ${this.props.accessToken}`
    }
  }

  componentDidUpdate (prevProps) {
    const {
      loggedIn,
      Component,
    } = this.props

    if (!loggedIn && prevProps.loggedIn && Component.authenticationRequired) {
      Router.push('/')
    }
  }

  render () {
    const {
      Component,
      pageProps,
      path,
      statusCode,
    } = this.props

    return (
      <div role="application">
        <input
          hidden
          id="application-banner-control"
          type="checkbox" />

        <Head />

        <Banner path={path} />

        {statusCode === 200 ? (
          <Component {...pageProps} />
        ) : (
          <ErrorPage statusCode={statusCode} />
        )}

        <AlertsController />
      </div>
    )
  }

  static mapStateToProps = ({ authentication, users }) => ({
    loggedIn: authentication.loggedIn,
    verifyError: authentication.verifyError,
    user: users[authentication.userId] || null,
  })

  static mapDispatchToProps = dispatch => bindActionCreators({
    logout: actions.logout,
    verifySession: actions.verifySession,
  }, dispatch)
}




export default connect(AppLayout)
