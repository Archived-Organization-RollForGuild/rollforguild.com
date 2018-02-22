import actionTypes from '../actionTypes'
import initialState from '../initialState'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'




export default function (state = initialState.groups, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_GROUP:
    case actionTypes.GET_GROUP:
    case actionTypes.GET_USER:
      if (status === 'success') {
        let newGroups = parseJSONAPIResponseForEntityType(payload, 'groups', true)

        newGroups = Object.values(newGroups).reduce((accumulator, group) => {
          const oldGroup = state[group.id]
          const memberStatus = group.member_status || (oldGroup ? oldGroup.member_status : null)

          return {
            ...accumulator,
            [group.id]: {
              ...group,
              member_status: memberStatus,
            },
          }
        }, {})

        return {
          ...state,
          ...newGroups,
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}
