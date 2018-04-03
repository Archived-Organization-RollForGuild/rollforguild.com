// Module imports
import React from 'react'
import Switch from 'rc-switch'





// Component imports
import { Router } from '../../routes'
import { convertStringToSlug } from '../../helpers'
import AddressInput from '../../components/AddressInput'
import Form from '../../components/Form'
import Component from '../../components/Component'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import ValidatedInput from '../../components/ValidatedInput'





// Component constants
const title = 'Create a Group'





class CreateGroup extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _filterDropdownOptions (options, value) {
    const regex = new RegExp(`${value}.*`, 'gi')

    return options.filter(option => regex.test(option))
  }

  async _handleSubmit (event) {
    const { createGroup } = this.props
    const {
      address,
      description,
      discoverable,
      name,
      slug,
    } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    const { payload } = await createGroup({
      address: address.formatted_address,
      description,
      discoverable,
      name,
      slug: slug || convertStringToSlug(name),
    })
    const {
      id,
    } = payload.data

    if (id) {
      return Router.pushRoute('group profile', { id })
    }

    return this.setState({ submitting: false })
  }

  _isValid () {
    const {
      address,
      name,
    } = this.state

    if (!address || !name) {
      return false
    }

    return true
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleSubmit'])

    this.state = {
      address: '',
      description: '',
      discoverable: true,
      name: '',
      slug: '',
      submitting: false,
    }
  }

  render () {
    const {
      address,
      description,
      discoverable,
      name,
      slug,
      submitting,
    } = this.state

    return (
      <React.Fragment>
        <PageHeader>
          <h1>Create a Group</h1>
        </PageHeader>

        <Main title={title}>
          <Form
            action="create"
            category="Groups"
            label="New Group"
            onSubmit={this._handleSubmit}>
            <fieldset>
              <label htmlFor="group-name">
                Group name
              </label>

              <ValidatedInput
                disabled={submitting}
                id="group-name"
                onChange={({ target }) => this.setState({ name: target.value })}
                pattern="[\w\s_-]+"
                placeholder="Quigley's Tavern"
                required
                type="text"
                value={name} />
            </fieldset>

            <fieldset>
              <label htmlFor="permalink">Permalink</label>

              <div className="input-group">
                <label htmlFor="permalink">
                  https://rollforguild.com/groups/
                </label>

                <ValidatedInput
                  disabled={submitting}
                  id="permalink"
                  onChange={({ target }) => this.setState({ slug: convertStringToSlug(target.value) })}
                  pattern="(\w|-)*"
                  placeholder={convertStringToSlug(name)}
                  type="text"
                  value={slug} />
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="group-description">
                Group description
              </label>

              <textarea
                aria-describedby="group-description"
                disabled={submitting}
                id="group-description"
                maxLength={1000}
                onChange={({ target }) => this.setState({ description: target.value })}
                placeholder="Tell your members what you'll be playing, or maybe a bit about your GM style."
                value={description} />

              <small>Tell your members what you'll be playing, or maybe a bit about your GM style.</small>
            </fieldset>

            <fieldset>
              <label htmlFor="address">
                Where will you be playing?
              </label>

              <AddressInput
                disabled={submitting}
                id="address"
                onChange={value => this.setState({ address: value })}
                required
                value={address} />
            </fieldset>

            <fieldset className="horizontal">
              <label htmlFor="discoverable">
                Should your group show up in searches?
              </label>

              <Switch
                disabled={submitting}
                checked={discoverable}
                id="discoverable"
                onChange={isChecked => this.setState({ discoverable: isChecked })} />
            </fieldset>

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={submitting || !this._isValid()}>
                  Create
                </button>
              </div>
            </menu>
          </Form>
        </Main>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['createGroup']





export default Page(CreateGroup, title, { mapDispatchToProps })
