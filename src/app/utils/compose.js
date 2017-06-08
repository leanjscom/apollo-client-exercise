export function compose () {
  const args = [...arguments]
  const higherOrderComponents = [...args]
  const component = higherOrderComponents.pop()
  higherOrderComponents.reverse()

  return function (config = {}) {
    if (config.mock) {
      return args
    }

    const composedComponent = higherOrderComponents.reduce(
      (prev, current) => {
        if (typeof current === 'function') {
          return current(prev)
        } else if (typeof current.call === 'function') {
          return current.call(...(current.args || []))(prev)
        }

        return prev
      },
      component
    )

    return composedComponent
  }
}

export const call = (func, ...args) => ({
  call: func,
  args
})
