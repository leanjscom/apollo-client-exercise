import React from 'react'
import ReactDOM from 'react-dom'
// remove injectTapEventPlugin when React 1.0 is released. Needed for onTouchTap. http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo'
import { AppContainer } from 'react-hot-loader'

import configureStore from './app/store'
import Root from './app/components/Root'

injectTapEventPlugin()

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://ec2-35-176-58-126.eu-west-2.compute.amazonaws.com:8080/graphql',
  batchInterval: 10
})

const client = new ApolloClient({
  networkInterface
})

const store = configureStore(client)
const rootEl = document.getElementById('root')

try {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} client={client} />
    </AppContainer>,
    rootEl
  )
  if (module.hot) {
    module.hot.accept('./app/components/Root', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextApp = require('./app/components/Root').default
      ReactDOM.render(
        <AppContainer>
          <NextApp store={store} client={client} />
        </AppContainer>,
        rootEl
      )
    })
  }
} catch (error) {
  console.log(error)
}

// ReactDOM.render(<Root store={store} client={client} />, )
