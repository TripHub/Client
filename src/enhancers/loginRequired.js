import React from 'react'
import { connect } from 'react-redux'
import { renewAuthRequest } from '../data/user/actions'
import { isUserAuthenticated } from '../data/user/selectors'

// checks the user is logged in, else send to the login screen
export default (Wrapped) => {
  class LoginRequired extends React.Component {
    componentDidMount () {
      if (!this.props.isUserAuthenticated) {
        this.props.renewAuthRequest({
          state: {
            returnTo: window.location.pathname
          }
        })
      }
    }

    render () {
      return this.props.isUserAuthenticated
        ? <Wrapped {...this.props} />
        : <div />
    }
  }

  const mapStateToProps = (state) => ({
    isUserAuthenticated: isUserAuthenticated(state)
  })

  const mapDispatchToProps = (dispatch) => ({
    renewAuthRequest: (config) => dispatch(renewAuthRequest(config))
  })

  return connect(mapStateToProps, mapDispatchToProps)(LoginRequired)
}
