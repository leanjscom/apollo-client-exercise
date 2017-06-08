/* eslint no-underscore-dangle: 0 */
import { createStore, applyMiddleware, compose } from 'redux'

import createReducers from '../reducers'

const configureStore = (client, initialState = undefined) =>
  createStore(
    createReducers({
      apollo: client.reducer()
    }),
    initialState,
    compose(
      applyMiddleware(client.middleware()),
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  )

export default configureStore
