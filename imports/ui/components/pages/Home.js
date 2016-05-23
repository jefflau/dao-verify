import React, { Component } from 'react'
import VerifyForm from '../VerifyForm';
import { connect } from 'react-redux';
import  { submitForm } from '../../actions/actions';

class Home extends Component {
  render(){
    let { form, submitHandler} = this.props;
    console.log(this.props)
    return (
      <div>
        <VerifyForm onSubmit={submitHandler.bind(null, form)} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    form: state.form.verifyForm
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
