import React, { Component } from 'react'
import VerifyForm from '../VerifyForm';
import { connect } from 'react-redux';
import  { submitForm } from '../../actions/actions';

class Home extends Component {
  render(){
    let { form, submitHandler, tokens} = this.props;
    return (
      <div>
        {tokens ? <div>{tokens} token found. Please send 1 wei to this address</div> : "" }
        <VerifyForm onSubmit={submitHandler.bind(null, form)} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    form: state.form.verifyForm,
    tokens: state.account.tokens
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(submitForm(form))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
