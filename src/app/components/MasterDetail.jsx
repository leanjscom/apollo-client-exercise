import React from 'react'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'

const MasterDetail = ({ master, detail, width }) => {
  let masterView,
    detailView
  const detailVw = <div className="view">{detail}</div>

  if (width !== LARGE && detail != null) {
    masterView = detailVw
    detailView = null
  } else if (width !== LARGE && detail == null) {
    masterView = master
    detailView = null
  } else {
    masterView = master
    detailView = detailVw
  }

  return (
    <div className="view-container">
      {masterView}
      {detailView}
    </div>
  )
}

export default withWidth()(MasterDetail)
