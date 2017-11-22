import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/reducers'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'

const ForecastDay = (props) => {
  return (
    <div>
      <p>{props.dateString}</p>
      <img
        src={props.icon}
        height='100'
        width='100'
      />
    </div>
  )
}
class ForecastContainer extends React.Component {
  // componentDidMount () {
  //
  // }
  render () {
    const {isFetching, error, weather, noWeather} = this.props
    return (
      isFetching
        ? <div>{'Fetching Weather'}</div>
        : error.length === 0
          ? !noWeather
            ? <div>
              <div>{`Forecast for ${weather.city} on ${weather.dt}`}</div>
              {weather.forecast.map((day) => {
                return (
                  <ForecastDay
                    dateString={day.dateString}
                    icon={day.icon}
                  />
                )
              }
                )}
            </div>
            : <div>{'Input City'}</div>
          : <div>{error}</div>)
  }
}

const mapStateToProps = ({application}) => {
  return {
    isFetching: application.isFetching,
    error: application.error,
    noWeather: typeof application.weather === 'undefined',
    weather:  application.weather
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer)
