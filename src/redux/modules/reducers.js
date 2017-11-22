import { basicRequest, currentIpGeoRequest, coordsWeatherRequest } from '../../helpers/api'
import { formatForecast, formatDT, filterForecastList } from '../../helpers/utils'

const TESTING = 'TESTING'
const UPDATE_INPUT_TEXT = 'UPDATE_INPUT_TEXT'
const FETCHING_WEATHER = 'FETCHING_WEATHER'
const FETCHING_WEATHER_FAILURE = 'FETCHING_WEATHER_FAILURE'
const FETCHING_WEATHER_SUCCESS = 'FETCHING_WEATHER_SUCCESS'
const UPDATE_LOCAL_WEATHER = 'UPDATE_LOCAL_WEATHER'
const UPDATE_LOCAL_COORDS = 'UPDATE_LOCAL_COORDS'

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
    type: FETCHING_WEATHER,
  }
}
export const fetchingWeatherSuccess = (weather) => {
  return {
    type: FETCHING_WEATHER_SUCCESS,
    weather
  }
}
export const fetchingWeatherFailure = (error) => {
  return {
    type: FETCHING_WEATHER_FAILURE,
    error,
  }
}
const updateLocalCoords = (coords) => {
  return {
    type: UPDATE_LOCAL_COORDS,
    coords
  }
}
const updateLocalWeather = (weather) => {
  return {
    type: UPDATE_LOCAL_WEATHER,
    weather
  }
}
export const fetchAndHandleLocalWeather = () => {
  return function (dispatch) {
    dispatch(fetchingWeather())
    currentIpGeoRequest()
      .then((response) => {
        const localCoords = {
          lat: response.lat,
          lon: response.lon
        }
        dispatch(updateLocalCoords(localCoords))
        coordsWeatherRequest(localCoords)
        .then((response) => {
          console.info(response)
          if (response.cod === 200 || response.cod === '200') {
            const weather = {
              dt: response.dt,
              temp: response.main.temp,
              desc: response.weather[0].description
            }
            dispatch(fetchingWeatherSuccess(weather))
          } else {
            dispatch(fetchingWeatherFailure(response.message))
          }
        })
        .catch((err) => {
          dispatch(fetchingWeatherFailure(err))
        })
      })
  }
}
export const fetchandHandleWeather = (inputText, forecast) => {
  console.info('forecast', forecast)
  return function (dispatch) {
    dispatch(fetchingWeather())
    basicRequest(inputText, forecast)
      .then((response) => {
        console.info(response.cod)
        if (response.cod === 200 || response.cod === '200') {
          console.info(response)
          const weather = {
            city: `${response.city.name}, ${response.city.country}`,
            dt: formatDT(response.list[0].dt),
            forecast: response.list.filter(filterForecastList).map(formatForecast)
          }
          dispatch(fetchingWeatherSuccess(weather))
        } else {
          dispatch(fetchingWeatherFailure(response.message))
        }
      })
      .catch((err) => {
        dispatch(fetchingWeatherFailure(err))
      })
  }
}

const initialState = {
  inputText: '',
  isFetching: false,
  error: ''
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
        error: ''
      }
    case FETCHING_WEATHER_SUCCESS:
      return {
        ...state,
        inputText: '',
        isFetching: false,
        weather: action.weather,
        error: ''
      }
    case FETCHING_WEATHER_FAILURE:
      return {
        ...state,
        inputText: '',
        error: action.error,
        isFetching: false
      }
    case UPDATE_LOCAL_COORDS:
      return {
        ...state,
        isFetching: false,
        error: '',
        localLat: action.coords.lat,
        localLon: action.coords.lon
      }
    case UPDATE_LOCAL_WEATHER:
    return {
      ...state,
      isFetching: false,

    }
    default:
      return state
  }
}
// export const reducerKey2 = (state = {things: 0}, action) => {
//   return {
//     ...state,
//     ...initialState
//   }
// }
