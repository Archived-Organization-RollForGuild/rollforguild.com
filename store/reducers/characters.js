import initialState from '../initialState'
import actionTypes from '../actionTypes'





export default function (state = initialState.characters, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = { ...state }
  // const characters = [...state.characters]

  switch (type) {
    case actionTypes.CREATE_CHARACTER:
    case actionTypes.GET_CHARACTERS:
      switch (status) {
        case 'success':
          // console.log('Handling new characters:', payload.data)
          // for (const newCharacter of payload.data) {
          //   const index = characters.findIndex(character => newCharacter.id === character.id)

          //   if (index === -1) {
          //     characters.push(newCharacter)
          //   } else {
          //     characters[index] = newCharacter
          //   }
          // }

          // newState.characters = characters

          newState.characters = payload.data

          return newState

        default:
          return newState
      }

    default:
      return newState
  }
}
