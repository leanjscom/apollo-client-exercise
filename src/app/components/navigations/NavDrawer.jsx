/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'
import Redeem from 'material-ui/svg-icons/action/redeem'
import School from 'material-ui/svg-icons/social/school'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import withLogout from '../../../auth/hocs/withLogout'

const NavDrawer = ({ router, toggleNav, open, styles, width, logout }) => {
  const menuItemClicked = (path) => {
    router.push(path)
    toggleNav()
  }

  return (
    <Drawer open={open} docked={width === LARGE} onRequestChange={toggleNav}>
      <div role="button" onClick={() => menuItemClicked('/')} style={styles.logo}>
        Course Manager
      </div>
      <ListItem onClick={() => menuItemClicked('/courses')} leftIcon={<School />}>Courses</ListItem>
      <ListItem onClick={() => menuItemClicked('/vouchers')} leftIcon={<Redeem />}>
        Vouchers
      </ListItem>
      <Divider />
      <ListItem onClick={logout} leftIcon={<ExitToApp />}>Logout</ListItem>
    </Drawer>
  )
}

NavDrawer.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired
}

export default withWidth()(withRouter(withLogout(NavDrawer)))
