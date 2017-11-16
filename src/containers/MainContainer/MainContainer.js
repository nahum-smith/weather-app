import React from 'react'
import MainInputField from '../../components/MainInput/MainInput'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import GridList from 'material-ui/GridList'

const styles = (theme) => ({
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '300px'
  },
  submitButton: {
    marginTop: '10px'
  }
})

class MainContainer extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={ classes.centeredContainer }>
        <h1>{'Enter a City and State'}</h1>
        <MainInputField />
        <div className={ classes.submitButton }>
          <Button raised color='accent'>{ 'Get Weather' }</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MainContainer)
