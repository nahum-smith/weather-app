import React from 'react'
import MainInputField from '../../components/MainInput/MainInput'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import GridList from 'material-ui/GridList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/reducers'

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
  handleSubmitText = (text) => {
    this.props.fetchandHandleWeather(text)
  }
  render () {
    const { classes, inputText } = this.props
    return (
      <div className={classes.centeredContainer}>
        <h1>{'Enter a City and Country'}</h1>
        <MainInputField />
        <div className={classes.submitButton}>
          <Button onClick={() => this.handleSubmitText(inputText)} raised color='accent'>{ 'Get Weather' }</Button>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainContainer))
