import logo from './logo.svg'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import MainInputField from '../../components/MainInput/MainInput'
import './HeaderBar.css'

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  submitButton: {
    marginLeft: '10px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  titleFont: {
    fontFamily: 'satisfy',
    fontSize: '30px'
  },
})

function ButtonAppBar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className={'App-logo'} alt='logo' />
          <Typography type="title" color="inherit" className={classes.titleFont}>
            {'Weather or Not'}
          </Typography>
          <div className={classes.flex}>
            <MainInputField />
            <Button className={classes.submitButton} raised color="accent">{'Get Weather'}</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
