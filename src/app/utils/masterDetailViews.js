export const getMasterDetailViews = (listView, childrenView, id) => {
  let masterView,
    detailView
  if (props.width !== LARGE && props.params.id != null) {
    masterView = childrenView
    detailView = null
  } else if (props.width !== LARGE && props.params.id == null) {
    masterView = listView
    detailView = null
  } else {
    masterView = listView
    detailView = childrenView
  }

  return { masterView, detailView }
}
