import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';;
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Accounts from '../../../api/collections/accounts';
import VerifyForm from '../VerifyForm';
import  { submitForm } from '../../actions/actions';

class Home extends Component {
  render(){
    let { form, submitHandler, tokens, accountMeteor, serverError} = this.props;
    return (
      <div>
        {serverError.error ? <div>{serverError.error.reason}</div> : "" }
        {tokens ? <div>{tokens} token found. Please send 1 wei to this address</div> : "" }
        <VerifyForm onSubmit={submitHandler.bind(null, form)} />
      </div>
    )
  }
}

const HomeContainer = createContainer(({ account })=>{
  const accountSub = Meteor.subscribe('getAccount', account.userId);
  const accountLoading = !accountSub.ready();
  return {
    accountLoading,
    accountMeteor: Accounts.find({}).fetch()
  }
}, Home);


function mapStateToProps(state){
  return {
    form: state.form.verifyForm,
    tokens: state.account.tokens,
    account: state.account,
    serverError: state.serverError
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(submitForm({
        daoTokenAccount: form.daoTokenAccount.value,
        daoHubForumUsername: form.daoHubForumUsername.value
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
