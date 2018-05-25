// Component imports
import { connect } from '../helpers'
import Component from './Component'





const pageWrapper = (Page, authReq = false) => (
  class PageWrapper extends Component {
    static displayName = `Page(${Page.displayName || Page.name || 'Page'})`
    static authenticationRequired = Boolean(authReq)
    static getInitialProps = ctx => (Page.getInitialProps ? Page.getInitialProps(ctx) : {})

    render () {
      return (<Page {...this.props} />)
    }
  }
)

const connectPage = (Page, { mapStateToProps, mapDispatchToProps, mergeProps }, authReq) => pageWrapper(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Page), authReq)

export default function (Page, reduxOptions, authReq) {
  if (reduxOptions) {
    return connectPage(Page, reduxOptions, authReq)
  }
  return pageWrapper(Page, authReq)
}
export {
  connectPage,
  pageWrapper,
}
