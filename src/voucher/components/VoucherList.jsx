import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import { pinkA200 } from 'material-ui/styles/colors'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { throttle } from 'lodash'
import compose from 'recompose/compose'

import MasterDetail from '../../app/components/MasterDetail'
import { fetchMoreParams } from '../../app/utils/apolloUtils'
import { vouchersQueryVariables } from '../queries'
import ScrollNotifier from '../../app/components/notification/ScrollNotifier'
import VOUCHERS_QUERY from '../graphql/Vouchers.graphql'
import NewFloatingButton from '../../app/components/navigations/NewFloatingButton'

const VoucherList = ({ router, ...props }) => {
  const showVoucherDetail = ({ id }) => {
    router.push(`/vouchers/${id}`)
  }

  const { loading, error, vouchers = {} } = props.data
  let master

  if (loading) {
    master = <p>Loading ...</p>
  } else if (error) {
    master = <p>{error.message}</p>
  } else {
    const voucherEdges = vouchers.edges || []

    const listItems = voucherEdges.map(({ node }, index) => (
      <ListItem
        onClick={() => showVoucherDetail(node)}
        key={node.id}
        style={{ color: 'black' }}
        primaryText={`${node.code}  -  ${node.course_code}`}
        leftIcon={<ActionGrade color={pinkA200} />}
      />
    ))

    master = (
      <ScrollNotifier
        className="view"
        onScrollAtTheBottom={() => {
          if (vouchers.pageInfo.hasNextPage && !loading) {
            props.loadMoreEntries()
          }
        }}
      >
        <List>
          {listItems}
          <NewFloatingButton onClick={() => router.push('/vouchers/new')} />
        </List>
      </ScrollNotifier>
    )
  }

  return <MasterDetail master={master} detail={props.children} />
}

VoucherList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  children: PropTypes.object,
  params: PropTypes.object.isRequired
}

VoucherList.defaultProps = {
  data: {},
  children: null
}

const fetchVouchers = graphql(VOUCHERS_QUERY, {
  options: () => ({ ...vouchersQueryVariables }),
  props ({ data }) {
    const { vouchers, fetchMore } = data

    return {
      data,
      loadMoreEntries: throttle(() =>
        fetchMore(
          fetchMoreParams({
            query: VOUCHERS_QUERY,
            name: 'vouchers',
            data: vouchers,
            variables: vouchersQueryVariables.variables
          })
        ))
    }
  }
})

export default compose(
  withRouter, fetchVouchers
)(VoucherList)
