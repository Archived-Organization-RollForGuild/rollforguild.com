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

          const id = tab.props.id || index

          return (
            <Button
              category={category}
              className={active ? 'active' : null}
              key={title}
              label={title}
              onClick={() => selectTab(id)}>
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
    const { onSelect } = this.props

    this.setState({ currentTab: tabId })

    if (onSelect) {
      onSelect(tabId)
    }
  }

  _setTabActiveStatus (tab, index) {
    const id = tab.props.id || index

    if (tab) {
      return {
        ...tab,
        props: {
          ...tab.props,
          active: id === this.state.currentTab,
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

    this.state = {
      currentTab: props.defaultTab,
    }
  }

  render () {
    const {
      category,
      children,
      className,
    } = this.props
    const tabsWithActiveStatus = children.map(this._setTabActiveStatus)

    return (
      <div className={['tab-panel', className].join(' ')}>
        <TabHeader
          category={category}
          selectTab={this._selectTab}>
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
