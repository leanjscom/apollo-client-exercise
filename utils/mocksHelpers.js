export const mockFetch = (data) => {
  global.fetch = jest.fn()

  fetch.mockImplementation(params =>
    Promise.resolve({
      json: () => ({
        data,
        params
      })
    }))
}

export const mockFetchContainer = (data) => {
  global.fetch = jest.fn()

  fetch.mockImplementation(params =>
    Promise.resolve({
      json: () => data
    }))
}
