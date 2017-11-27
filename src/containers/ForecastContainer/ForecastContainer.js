import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/reducers'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import Typography from 'material-ui/Typography'
import 'typeface-roboto'
import Dialog, { DialogTitle, DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import NoSSR from '../../components/NoSSR'
import Button from 'material-ui/Button'

const styles = {
  listTile: {
    position: 'relative',
  },
  click: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    textDecoration: 'none',
    zIndex: '10',
    backgroundColor: '#FFF',
    opacity: '0',
    filter: 'alpha(opacity=1)'
  },
  forecastHeader: {
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  forecastDayText: {
    paddingBottom: '10px'
  },
  hover: {
    border: '2px solid #79A4B2',
    borderRadius: '7px'
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px'
  }
}
const Transition = (props) => {
  return <Slide direction='down' {...props} />
}

const ForecastDay =(props) => {
  const iconSrc = require(`../../weather-icons/${props.icon}.svg`)
  return (
    <div style={props.hover ? styles.hover : null}>
      <Typography style={styles.forecastDayText}>{props.dayString}</Typography>
      <img
        src={iconSrc}
        height='100'
        width='100'
      />
    {props.hover && <Typography type='caption'>{'Click for full forecast'}</Typography>}
    </div>
  )
}

const ForecastHeader = (props) => {
  return (
    <div style={styles.forecastHeader}>
      <Typography type='headline' gutterBottom >{`Forecast for ${props.city} on ${props.dt}`}</Typography>
    </div>
  )
}

const ForecastDialog = (props) => {
  console.info(props)
  const iconSrc = require(`../../weather-icons/${props.selectedday.icon}.svg`)
  return (
    <div>
      <Dialog
        onRequestClose={props.onRequestClose}
        open={props.open}
        transition={Transition}
        keepMounted
        {...props} >
        <DialogTitle>{props.selectedday.dateString}</DialogTitle>
        <div style={styles.imgContainer}>
          <img src={iconSrc} height='100' width='100'/>
        </div>
        <DialogContent>
          <DialogContentText>{props.selectedday.desc.toUpperCase()}</DialogContentText>
          <DialogContentText>{`High: ${props.selectedday.maxTemp} degrees`}</DialogContentText>
          <DialogContentText>{`Low: ${props.selectedday.minTemp} degrees`}</DialogContentText>
          <DialogContentText>{`Humidity: ${props.selectedday.humidity} percent`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onRequestClose} color="primary">
            {'close'}
          </Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}
class ForecastContainer extends React.Component {

  state = {
    hover: null,
    open: false
  }

  handleTileClick = (day, index) => {
    this.setState(() => ({
      ...this.state,
      open: true,
      hover: index,
      day
    }))
  }
  handleMouseEnter = (index) => {
    console.info(`entering ${index}`)
    this.setState(() => ({
      hover: index,
    }))
  }
  handleMouseLeave = (index) => {
    console.info(`leaving ${index}`)
    this.setState(() => ({
      hover: null,
    }))
  }
  handleRequestClose = () => {
    console.info(this.state)
    this.setState(() => ({
      ...this.state,
      open: false
    }))
  }
  render () {
    const {isFetching, error, weather, noWeather, classes} = this.props
    return (
      isFetching
        ? <div>{'Fetching Weather'}</div>
        : error.length === 0
          ? !noWeather
            ? <div>
              <ForecastHeader city={weather.city} dt={weather.dt} />
              <GridList cols={6}>
                {weather.forecast.map((day, index) => {
                  return (
                    <GridListTile
                      key={index}
                      onClick={() => this.handleTileClick(day, index)}
                      onMouseEnter={() => this.handleMouseEnter(index)}
                      onMouseLeave={() => this.handleMouseLeave(index)} >
                      <ForecastDay
                        hover={this.state.hover === index}
                        dayString={day.dayString}
                        icon={day.icon}
                      />
                    </GridListTile>
                  )
                }
                  )}
              </GridList>
              {this.state.open === true
                ? <NoSSR>
                <ForecastDialog
                  selectedday={this.state.day}
                  open={this.state.open}
                  onRequestClose={() => this.handleRequestClose() }
                  />
                </NoSSR>
              : null}
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
