import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import session from '../../auth/reducers/session'

const createReducers = reducers =>
  combineReducers({
    session,
    form: formReducer,
    ...reducers
  })

export default createReducers
