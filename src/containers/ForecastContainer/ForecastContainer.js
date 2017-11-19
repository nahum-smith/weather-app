import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/reducers'

class ForecastContainer extends React.Component {
  componentDidMount () {

  }
  render () {
    const { isFetching } = this.props
    return (
      isFetching
        ? <div>{'Fetching Weather'}</div>
        : <div>{'Weather'}</div>)
  }
}

const mapStateToProps = ({application}) => {
  return {
    isFetching: application.isFetching,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer)
