const throttle = (callback, limit = 200) => {
  let wait = false
  return () => {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(
        () => {
          wait = false
        },
        limit
      )
    }
  }
}

export default throttle
