import initialState from '../initialState'





export default function (state = initialState.__pending, action) {
  const {
    status,
    type,
    __aId,
    __aArgs,
  } = action


  // Don't track actions which lack a tracking id
  if (!__aId) {
    return { ...state }
  }

  // If there is no status, just add the entry to state. We are now waiting for the resolving dispatch.
  if (!status) {
    return {
      ...state,
      [type]: {
        ...(state[type] || {}),
        [__aId]: __aArgs,
      },
    }
  }

  // If there is a status, the action has been completed and we can remove the pending status of the action.
  const newPending = { ...state }
  delete newPending[type][__aId]

  // If there are no other open requests for this type, we can remove the type from the pending state.
  if (!Object.values(newPending[type]).length) {
    delete newPending[type]
  }

  return {
    ...state,
    [type]: newPending,
  }
}
