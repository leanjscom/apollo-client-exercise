import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import { withRouter } from 'react-router'
import compose from 'recompose/compose'

import { vouchersQueryVariables } from '../queries'
import VOUCHERS_QUERY from '../graphql/Vouchers.graphql'
import CREATE_VOUCHER from '../graphql/CreateVoucher.graphql'
import withNotifier from '../../app/components/notification/withNotifier'
import VoucherForm from './VoucherForm'
import { getErrorMessages } from '../../app/utils/graphQL'

const NewVoucher = ({ mutate, router, notifier }) => {
  const save = (variables) => {
    
  }

  return (
    <Card>
      <CardText>
        <VoucherForm onSubmit={save} />
      </CardText>
    </Card>
  )
}

NewVoucher.propTypes = {
  mutate: PropTypes.func.isRequired
}

export default compose(
  withNotifier, withRouter
)(NewVoucher)
