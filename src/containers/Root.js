import React, { Component } from 'react'
import HeaderBar from './HeaderBar/HeaderBar'
import MainContainer from './MainContainer/MainContainer'
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
        <HeaderBar />
        <div className={classes.mainContainer}>
          <MainContainer />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Root)
