/* eslint no-named-as-default: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { propTypes, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Login from '../components/Login'
import { loggedIn } from '../actions/session'
import { setSessionToken } from '../../app/utils/localStorage'

export class LoginContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signInError: false }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin ({ username, password }) {
    if (username === 'demo' && password === '1234') {
      const token = 'this_token_should_come_from_your_auth_api'
      setSessionToken(token)
      this.props.dispatchLoggedInAction(token)
      this.props.router.push('/')
    } else {
      this.setState({ signInError: 'Invalid credentials' })
      // alert('Invalid credentials')
    }
  }

  render () {
    return <Login {...this.props} signInError={this.state.signInError} onLogin={this.onLogin} />
  }
}

const mapDispatchToProps = {
  dispatchLoggedInAction: loggedIn
}

LoginContainer.propTypes = {
  ...propTypes,
  dispatchLoggedInAction: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
}

// export default withRouter(connect(null, mapDispatchToProps)(LoginContainer))

const withReduxForm = reduxForm({
  form: 'signIn',
  validate: (values, props) => {
    const errors = {}
    if (!values.username) errors.username = 'Username is required'
    if (!values.password) errors.password = 'Password is required'
    return errors
  }
})

export default connect(null, mapDispatchToProps)(withRouter(withReduxForm(LoginContainer)))
