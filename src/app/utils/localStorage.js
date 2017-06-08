const SESSION_TOKEN = 'SESSION_TOKEN'

const setItem = (key, item) => {
  try {
    localStorage.setItem(key, item)

    return true
  } catch (e) {
    return false
  }
}

const getItem = (item) => {
  try {
    return localStorage.getItem(item)
  } catch (e) {
    return undefined
  }
}

export const getSessionToken = () => getItem(SESSION_TOKEN)

export const setSessionToken = token => setItem(SESSION_TOKEN, token)
