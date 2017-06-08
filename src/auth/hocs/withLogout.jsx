import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import * as actions from '../actions/session'
import { setSessionToken } from '../../app/utils/localStorage'

const withLogout = (Component) => {
  const WithLogout = (props) => {
    const logout = () => {
      setSessionToken(null)
      props.logout()
      props.router.push('/login')
    }

    return <Component {...props} logout={() => logout()} />
  }

  WithLogout.propTypes = {
    router: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  const mapDispatchToProps = {
    logout: actions.logout
  }

  return withRouter(connect(null, mapDispatchToProps)(WithLogout))
}

export default withLogout
