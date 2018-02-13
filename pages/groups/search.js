// Module imports
import React from 'react'





// Component imports
import AddressInput from '../../components/AddressInput'
import Page from '../../components/Page'





// Component constants
const title = 'Search Groups'





const SearchGroups = () => (
  <React.Fragment>
    <header>
      <h1>Search Groups</h1>
    </header>

    <fieldset>
      <div className="input-group">
        <i className="fas fa-fw fa-search" />

        <AddressInput />
      </div>

      <small>Use your location to search for nearby groups</small>
    </fieldset>
  </React.Fragment>
)





export default Page(SearchGroups, title)
