import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';;
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Accounts from '../../../api/collections/accounts';
import VerifyForm from '../VerifyForm';
import  { submitForm } from '../../actions/actions';

class Home extends Component {
  render(){
    let { form, submitHandler, tokens, accountMeteor, serverError, config} = this.props;
    var intro = <div className="intro">Enter your DAO Token Account and your DAOHub Forum username to link them together</div>
    console.log(config)
    return (
      <div className="home">
        <div className="notifier">
          {!serverError.error && !tokens && intro}
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }
          {!serverError.error && tokens ? <div>{tokens} token found. Please send 1 wei to this address: {config.verifierAddress}</div> : "" }
        </div>
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
    serverError: state.serverError,
    config: state.config
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(submitForm({
        daoTokenAccount: form.daoTokenAccount.value.toLowerCase(),
        daoHubForumUsername: form.daoHubForumUsername.value
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
