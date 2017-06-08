import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { cyan500 } from 'material-ui/styles/colors'
import { spacing, typography } from 'material-ui/styles'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'

import AppNavDrawer from './navigations/NavDrawer'
import theme from '../config/theme'
import Notifier from './notification/Notifier'
import Dialog from './notification/Dialog'

const muiTheme = getMuiTheme(theme)

class App extends Component {
  static getStyles () {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: muiTheme.zIndex.appBar + 1,
        top: 0
      },
      root: {},
      nav: {
        color: typography.textFullWhite
      },
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8
      }
    }

    return styles
  }

  constructor () {
    super()
    this.state = {
      nav: { open: false }
    }
    this.toggleNav = this.toggleNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  toggleNav () {
    this.setState({ nav: { open: !this.state.nav.open } })
  }

  closeNav () {
    this.setState({ nav: { open: false } })
  }

  render () {
    const { prepareStyles } = muiTheme
    let docked = false
    let navDrawerOpen = this.state.nav.open
    const styles = App.getStyles()

    if (this.props.width === LARGE) {
      docked = true
      navDrawerOpen = true
      styles.root.paddingLeft = 256
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Notifier>
          <Dialog>
            {/* remove this <div className="app"> with react fiber, fix css and remove wrapping divs in Dialog and Notifier components */}
            <div className="app">
              <div className="main-view">
                <AppBar
                  title="Course Manager"
                  onLeftIconButtonTouchTap={this.toggleNav}
                  className="app-bar"
                />
                <AppNavDrawer
                  open={navDrawerOpen}
                  toggleNav={this.toggleNav}
                  closeNav={this.closeNav}
                  styles={styles}
                  docked={docked}
                />
                <div style={prepareStyles(styles.root)} className="view-container">

                  {this.props.children}

                </div>
              </div>
            </div>
          </Dialog>
        </Notifier>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  width: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired
}

export default withWidth()(App)
