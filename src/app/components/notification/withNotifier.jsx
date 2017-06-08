import React from 'react'
import PropTypes from 'prop-types'

const withNotifier = (Component) => {
  const WithNotifier = (props, context) => <Component {...props} notifier={context.notifier} />

  WithNotifier.contextTypes = {
    notifier: PropTypes.object
  }

  return WithNotifier
}

export default withNotifier
