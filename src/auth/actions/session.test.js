import { logout, loggedIn, LOG_OUT, LOGGED_IN } from './session'

test(`Return an Action tyoe ${LOGGED_IN}`, () => {
  const token = '123456'
  expect(loggedIn(token)).toEqual({
    type: LOGGED_IN,
    token
  })

  expect(loggedIn(token)).toMatchSnapshot()
})

test(`Return an Action tyoe ${LOG_OUT}`, () => {})
