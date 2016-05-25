import { callMethodPromise } from '../../helpers/helperPromises';
import store from '../../store';

function tokensFound(tokens){
  return {
    type: 'TOKENS_FOUND',
    tokens: tokens
  }
}

function updateAccount(userData){
  return {
    type: 'UPDATE_ACCOUNT',
    userData
  }
}

function serverError(error) {
  return {
    type: 'SERVER_ERROR',
    error
  }
}

function clearError() {
  return {
    type: 'CLEAR_ERROR'
  }
}


export function submitForm(form){
  return (dispatch) => {
    callMethodPromise('submitVerifyForm', form).then((data)=>{
      dispatch(clearError())
      dispatch(tokensFound(data.tokens))
      dispatch(updateAccount(data))
      return data.tokens;
    }).catch((err)=>{
      dispatch(serverError(err));
    })
  }
}
