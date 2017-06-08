export const getErrorMessages = (err) => {
  const { graphQLErrors } = err
  const errorMessages = []
  if (graphQLErrors) {
    graphQLErrors.reduce(
      (errorMessages, GQLError) => {
        errorMessages.push(GQLError.message)
        return errorMessages
      },
      errorMessages
    )
  }

  return errorMessages
}
