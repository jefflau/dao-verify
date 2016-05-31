import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'daoTokenAccount', 'daoHubForumUsername' ]

const validate = values => {
  const errors = {}
  if (!values.daoTokenAccount) {
    errors.daoTokenAccount = 'This field is required'
  } else if (values.daoTokenAccount.length < 42) {
    errors.daoTokenAccount = 'Ethereum account has 42 characters'
  }
  if (!values.daoHubForumUsername) {
    errors.daoHubForumUsername = 'This field is required'
  }
  return errors
}

class VerifyForm extends Component {
  render() {
    const {
      fields: { daoTokenAccount, daoHubForumUsername },
      handleSubmit,
      submitting
      } = this.props

    let daoHubForumUsernameError = daoHubForumUsername.error ? <div className="forum-username-error error">{daoHubForumUsername.error}</div>: null;
    return (<form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Daohub Token Account</label>
          <input type="text" placeholder="0x..." {...daoTokenAccount}/>
          {daoTokenAccount.touched && daoTokenAccount.error && <div className="token-account-error error">{daoTokenAccount.error}</div>}
        </div>
        <div className="input-group">
          <label>DaoHub Forum Username</label>
          <input type="text" placeholder="DAOHub forum username" {...daoHubForumUsername}/>
          {daoHubForumUsername.touched && daoHubForumUsername.error && <div className="forum-username-error error">{daoHubForumUsername.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Link Accounts
          </button>
        </div>
      </form>
    )
  }
}

VerifyForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'verifyForm',
  fields,
  validate
})(VerifyForm)
