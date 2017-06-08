import React from 'react'
import PropTypes from 'prop-types'

const WithRouter = (MyComponent) => {
  const withRouter = (props, context) => <MyComponent {...props} router={context.router} />

  withRouter.contextTypes = {
    router: PropTypes.object.isRequired
  }

  return withRouter
}

export default WithRouter
