import React from 'react'
import PropTypes from 'prop-types'
import DialogMUI from 'material-ui/Dialog'

class Dialog extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false,
      message: '',
      title: '',
      modal: false,
      actions: null,
      showCloseBtn: true
    }
  }

  open = ({ message, title, modal = false, actions, showCloseBtn = true }) => {
    this.setState({
      open: true,
      message,
      title,
      modal,
      actions,
      showCloseBtn
    })
  };

  close = () => {
    this.setState({
      open: false
    })
  };

  getChildContext () {
    return {
      dialog: {
        open: this.open,
        close: this.close
      }
    }
  }

  render () {
    /*
    let actions = this.state.actions
    if (this.state.showCloseBtn) {
      actions = [
        this.state.actions,
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.close}
        />
      ]
    }
    */
    return (
      <div>
        {this.props.children}
        <DialogMUI
          title={this.state.title}
          actions={this.state.actions}
          modal={this.state.modal}
          open={this.state.open}
          onRequestClose={this.close}
        >
          {this.state.message}
        </DialogMUI>
      </div>
    )
  }
}

Dialog.childContextTypes = {
  dialog: PropTypes.object
}

export default Dialog
