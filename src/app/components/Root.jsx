import React from 'react'
import PropTypes from 'prop-types'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import configureRoutes from '../config/Routes'

import '../../../public/css/main.css'

const Root = ({ store, client }) => {
  const Routes = configureRoutes(store)

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={hashHistory}>
          {Routes}
        </Router>
      </Provider>
    </ApolloProvider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
}

export default Root
