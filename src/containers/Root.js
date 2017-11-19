import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HeaderBar from './HeaderBar/HeaderBar'
import MainContainer from './MainContainer/MainContainer'
import ForecastContainer from './ForecastContainer/ForecastContainer'
import { withStyles } from 'material-ui/styles'
import bg from './bg.jpeg'

const styles = (theme) => ({
  rootContainer: {
    textAlign: 'center',
    height: '100vh'
  },
  mainContainer: {
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%'
  }
})
class Root extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={ classes.rootContainer }>
        <Route path='/' component={HeaderBar} />
        <div className={classes.mainContainer}>
          <Route path='/' exact component={MainContainer} />
          <Route path='/forecast' exact component={ForecastContainer} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Root)
