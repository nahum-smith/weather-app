import { basicRequest } from '../../helpers/api'

const TESTING = 'TESTING'
const UPDATE_INPUT_TEXT = 'UPDATE_INPUT_TEXT'
const FETCHING_WEATHER = 'FETCHING_WEATHER'
const FETCHING_WEATHER_FAILURE = 'FETCHING_WEATHER_FAILURE'
const FETCHING_WEATHER_SUCCESS = 'FETCHING_WEATHER_SUCCESS'

export const testingActionCreator = () => {
  return {
    type: TESTING
  }
}
export const updateInputText = (inputText) => {
  return {
    type: UPDATE_INPUT_TEXT,
    inputText
  }
}
export const fetchingWeather = () => {
  return {
    type: FETCHING_WEATHER
  }
}
export const fetchingWeatherSuccess = () => {
  return {
    type: FETCHING_WEATHER_SUCCESS,
  }
}
export const fetchingWeatherFailure = (error) => {
  return {
    type: FETCHING_WEATHER_FAILURE,
    error,
  }
}
export const fetchandHandleWeather = (inputText) => {
  return function (dispatch) {
    dispatch(fetchingWeather())
    basicRequest(inputText, true)
      .then((response) => {
        console.info(response)
        setTimeout(() => dispatch(fetchingWeatherSuccess()), 2000)
      })
      .catch((err) => {
        dispatch(fetchingWeatherFailure(err))
      })
  }
}

const initialState = {
  inputText: '',
  isFetching: false,
  error: '',
}
export const application = (state = initialState, action) => {
  switch (action.type) {
    case TESTING:
      return {
        ...state,
        hobbies: 'programming',
        stuff: 35
      }
    case UPDATE_INPUT_TEXT:
      return {
        ...state,
        inputText: action.inputText
      }
    case FETCHING_WEATHER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_WEATHER_SUCCESS:
      return {
        ...state,
        inputText: '',
        isFetching: false
      }
    case FETCHING_WEATHER_FAILURE:
      return {
        ...state,
        inputText: '',
        error: action.error
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
