import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Card, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { cyan500, pinkA200 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import theme from '../../app/config/theme'
import { renderTextField } from '../../app/components/form/Fields'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 300
  },
  avatar: {
    margin: '1em',
    textAlign: 'center '
  },
  form: {
    padding: '0 1em 1em 1em'
  },
  input: {
    display: 'flex'
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc'
  }
}

const Login = ({ username, password, onLogin, handleSubmit, submitting, signInError }) => {
  const getColorsFromTheme = (themeParam) => {
    if (!themeParam) return { primary1Color: cyan500, accent1Color: pinkA200 }
    const {
      palette: {
        primary1Color,
        accent1Color
      }
    } = themeParam

    return { primary1Color, accent1Color }
  }

  const { primary1Color, accent1Color } = getColorsFromTheme()
  const muiTheme = getMuiTheme(theme)

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={{ ...styles.main, backgroundColor: primary1Color }}>
        <Card style={styles.card}>
          <div style={styles.avatar}>
            <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
          </div>
          {signInError &&
            <Snackbar
              open
              autoHideDuration={4000}
              message={signInError.message || signInError || 'aor.auth.sign_in_error'}
            />}
          <form onSubmit={handleSubmit(onLogin)}>
            <div style={styles.form}>
              <p style={styles.hint}>Academy Admin Panel</p>
              <div style={styles.input}>
                <Field
                  name="username"
                  component={renderTextField}
                  floatingLabelText={'aor.auth.username'}
                />
              </div>
              <div style={styles.input}>
                <Field
                  name="password"
                  component={renderTextField}
                  floatingLabelText={'aor.auth.password'}
                  type="password"
                />
              </div>
            </div>
            <CardActions>
              <RaisedButton
                type="submit"
                primary
                disabled={submitting}
                label={'aor.auth.sign_in'}
                fullWidth
              />
            </CardActions>
          </form>
        </Card>
      </div>
    </MuiThemeProvider>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  signInError: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired
}

Login.defaultTypes = {
  username: '',
  password: ''
}

export default Login
