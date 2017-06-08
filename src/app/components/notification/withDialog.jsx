import React from 'react'
import PropTypes from 'prop-types'

const withDialog = (Component) => {
  const WithDialog = (props, context) => <Component {...props} dialog={context.dialog} />

  WithDialog.contextTypes = {
    dialog: PropTypes.object
  }

  return WithDialog
}

export default withDialog
