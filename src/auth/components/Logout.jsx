import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'

const Logout = ({ logoutUser, color }) => (
  <FlatButton
    style={{ color }}
    label="Logout"
    onClick={() => {
      logoutUser()
    }}
  />
)

Logout.propTypes = {
  color: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default Logout
