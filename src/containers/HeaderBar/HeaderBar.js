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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/reducers'
import { NavLink } from 'react-router-dom'

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
    fontSize: '30px',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'inherit'
    }
  },
})

class ButtonAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmitText: PropTypes.func.isRequired,
  }
  handleSubmitText = (text) => {
    this.props.fetchandHandleWeather(text, true)
    this.props.history.push('/forecast')
  }
  render () {
    const { classes, updateInputText, inputText } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} className={'App-logo'} alt='logo' />
            <Button onClick={() => this.props.history.push('/')} color='inherit' className={classes.titleFont}>
              <Typography type="title" color="inherit" className={classes.titleFont}>{'Weather or Not'}</Typography>
            </Button>
            <div className={classes.flex}>
              <MainInputField />
              <Button onClick={() => this.handleSubmitText(inputText)} className={classes.submitButton} raised color="accent">{'Get Weather'}</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({application}) => {
  return {
    inputText: application.inputText
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonAppBar))
