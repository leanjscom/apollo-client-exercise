import session from './session'
import { LOG_OUT, LOGGED_IN } from '../actions/session'

describe('#Reducer: Session', () => {
  it('Return default state', () => {
    expect(session(undefined, { type: 'default_action' })).toEqual({ token: undefined })
    expect(session(undefined, { type: 'default_action' })).toMatchSnapshot()
  })

  it('Return state', () => {
    expect(session({ token: true }, { type: 'another_action' })).toEqual({ token: true })
    expect(session({ token: true }, { type: 'another_action' })).toMatchSnapshot()
  })

  it(`When Action ${LOGGED_IN} return state`, () => {
    expect(session({ token: false }, { type: LOGGED_IN, token: true })).toEqual({ token: true })
    expect(session({ token: false }, { type: LOGGED_IN, token: true })).toMatchSnapshot()
  })

  it(`When Action ${LOG_OUT} return state`, () => {
    expect(session({ token: true }, { type: LOG_OUT })).toEqual({ token: null })
    expect(session({ token: true }, { type: LOG_OUT })).toMatchSnapshot()
  })
})
