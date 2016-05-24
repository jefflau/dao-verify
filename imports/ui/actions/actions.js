import { callMethodPromise } from '../../helpers/helperPromises';
import store from '../../store';

function tokensFound(tokens){
  return {
    type: 'TOKENS_FOUND',
    tokens: tokens
  }
}

export function submitForm(form){
  return (dispatch) => {
    callMethodPromise('submitVerifyForm', form).then((tokens)=>{
      console.log(dispatch)
      dispatch(tokensFound(tokens))
      return tokens;
    }).catch((err)=>{
      console.error(err);
    })
  }
}
