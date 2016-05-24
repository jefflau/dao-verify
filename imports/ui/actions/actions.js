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


export function submitForm(form){
  return (dispatch) => {
    callMethodPromise('submitVerifyForm', form).then((data)=>{
      dispatch(tokensFound(data.tokens))
      dispatch(updateAccount(data))
      return data.tokens;
    }).catch((err)=>{
      console.error(err);
    })
  }
}
