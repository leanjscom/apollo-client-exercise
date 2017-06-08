import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'
import compose from 'recompose/compose'

import { vouchersQueryVariables } from '../queries'
import { getErrorMessages } from '../../app/utils/graphQL'
import VoucherForm from './VoucherForm'
import mapDataToProps from '../../app/utils/apolloUtils'
import VOUCHER_UPDATE from '../graphql/UpdateVoucher.graphql'
import VOUCHER_QUERY from '../graphql/Voucher.graphql'
import VOUCHERS_QUERY from '../graphql/Vouchers.graphql'
import withNotifier from '../../app/components/notification/withNotifier'
import withDialog from '../../app/components/notification/withDialog'

const EditVoucher = (props) => {
  const { loading, error } = props.data
  const { notifier, router } = props

  const save = (variables) => {
    
  }

  let content = null
  if (loading) {
    content = <p>Loading ...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <VoucherForm
        onSubmit={save}
        initialValues={props.initialValues}
      />
    )
  }

  return (
    <Card>
      <CardText>
        {content}
      </CardText>
    </Card>
  )
}

EditVoucher.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

EditVoucher.defaultProps = {
  data: {}
}

export default compose(
  withWidth(),
  withDialog,
  withNotifier,
  withRouter
)(EditVoucher)
