const mapDataToProps = (dataKey, newProp) =>
  ({ data }) => {
    const prop = data[dataKey] || {}

    return {
      data,
      [newProp]: prop
    }
  }

export const fetchMoreParams = ({ query, variables, name, data }) => ({
  query,
  variables: {
    cursor: data.pageInfo.endCursor,
    ...variables
  },
  updateQuery: (previousResult, { fetchMoreResult }) => {
    const newEdges = fetchMoreResult[name].edges
    const pageInfo = fetchMoreResult[name].pageInfo

    return {
      [name]: {
        edges: [...previousResult[name].edges, ...newEdges],
        pageInfo
      }
    }
  }
})

export default mapDataToProps
