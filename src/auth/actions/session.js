export const LOG_OUT = 'LOG_OUT'
export const LOGGED_IN = 'LOGGED_IN'

export const logout = () => ({
  type: LOG_OUT
})

export const loggedIn = token => ({
  type: LOGGED_IN,
  token
})
