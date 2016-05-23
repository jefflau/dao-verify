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
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>Daohub Token Account</label>
          <div>
            <input type="text" placeholder="First Name" {...daoTokenAccount}/>
          </div>
          {daoTokenAccount.touched && daoTokenAccount.error && <div>{daoTokenAccount.error}</div>}
        </div>
        <div>
          <label>DaoHub Forum Username</label>
          <div>
            <input type="text" placeholder="Last Name" {...daoHubForumUsername}/>
          </div>
          {daoHubForumUsername.touched && daoHubForumUsername.error && <div>{daoHubForumUsername.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
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
