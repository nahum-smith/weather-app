const TESTING = 'TESTING'

export const testingActionCreator = () => {
  return {
    type: TESTING
  }
}

const initialState = {
  name: 'Nahum Smith',
  stuff: 36
}
export const reducerKey1 = (state = initialState, action) => {
  switch (action.type) {
    case TESTING:
      return {
        ...state,
        hobbies: 'programming',
        stuff: 35
      }
    default:
      return state
  }
}
export const reducerKey2 = (state = {things: 0}, action) => {
  return {
    ...state,
    ...initialState
  }
}
