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
    mutate({
      variables
    })
      .then(({ data }) => {
        router.push('/vouchers')
        notifier.open({ message: 'The voucher has been saved' })
      })
      .catch((err) => {
        const errorMessages = getErrorMessages(err)
        errorMessages.map((message) => {
          notifier.open({ message })
        })
      })
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

const createVoucher = graphql(CREATE_VOUCHER, {
  options: {
    update: (proxy, { data: { createVoucher } }) => {
      const query = { query: VOUCHERS_QUERY, ...vouchersQueryVariables }

      // Read the data from our cache for this query.
      const data = proxy.readQuery(query)

      // Add our comment from the mutation to the end.
      const cursorObj = {
        field: new Date().toISOString(),
        id: createVoucher.id
      }
      const cursor = window.btoa(JSON.stringify(cursorObj))
      data.vouchers.edges = [{ node: createVoucher, cursor }, ...data.vouchers.edges]

      // Write our data back to the cache.
      proxy.writeQuery({ ...query, data })
    }
  }
})

export default compose(
  withNotifier, withRouter, createVoucher
)(NewVoucher)
