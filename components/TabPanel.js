// Module imports
import Button from './Button'
import Component from './Component'





const Tab = (props) => {
  const {
    active,
    children,
  } = props

  return (
    <div
      className="tab"
      hidden={!active}>
      {children}
    </div>
  )
}





const TabHeader = (props) => {
  const {
    category,
    children,
    selectTab,
  } = props

  return (
    <header className="tab-header">
      {children.map((tab, index) => {
        if (tab) {
          const {
            active,
            title,
          } = tab.props

          return (
            <Button
              category={category}
              className={active ? 'active' : null}
              key={title}
              label={title}
              onClick={() => selectTab(index)}>
              {title}
            </Button>
          )
        }

        return null
      })}
    </header>
  )
}





class TabPanel extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _selectTab (tabId) {
    this.setState({ currentTab: tabId })
  }

  _setTabActiveStatus (tab, index) {
    if (tab) {
      return {
        ...tab,
        props: {
          ...tab.props,
          active: index === this.state.currentTab,
        },
      }
    }

    return null
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_selectTab',
      '_setTabActiveStatus',
    ])

    this.state = { currentTab: 0 }
  }

  render () {
    const {
      children,
      className,
    } = this.props
    const tabsWithActiveStatus = children.map(this._setTabActiveStatus)

    return (
      <div className={['tab-panel', className].join(' ')}>
        <TabHeader selectTab={this._selectTab}>
          {tabsWithActiveStatus}
        </TabHeader>

        {tabsWithActiveStatus}
      </div>
    )
  }
}





export {
  Tab,
  TabPanel,
}

export default TabPanel
