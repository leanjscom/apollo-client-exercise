/* eslint no-named-as-default: 0 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../components/App'
import Dashboard from '../../dashboard/components/Dashboard'
import EditVoucher from '../../voucher/components/EditVoucher'
import NewVoucher from '../../voucher/components/NewVoucher'
import VoucherList from '../../voucher/components/VoucherList'
import CourseList from '../../course/components/CourseList'
import NewCourse from '../../course/components/NewCourse'
import EditCourse from '../../course/components/EditCourse'
import Login from '../../auth/containers/LoginContainer'

const authCheck = (store, nextState, replace) => {
  const token = store.getState().session.token

  if (!token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const configureRoutes = store => (
  <Route>
    <Route
      path="/"
      component={App}
      onEnter={(nextState, replace) => authCheck(store, nextState, replace)}
    >
      <Route path="vouchers/new" component={NewVoucher} />
      <Route path="vouchers" component={VoucherList}>
        <Route path=":id" component={EditVoucher} />
      </Route>
      <Route path="courses/new" component={NewCourse} />
      <Route path="courses" component={CourseList}>
        <Route path=":id" component={EditCourse} />
      </Route>
      <IndexRoute component={Dashboard} />
    </Route>
    <Route path="login" component={Login} />
  </Route>
)

export default configureRoutes
