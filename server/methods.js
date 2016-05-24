import Todos from '../imports/collections';
import { checkDAOAccountExists, getCurrentBlock } from './blockchain';

function createAccount(){
  //getCurrentBlockNumber and add 24, will be the be 'confirmationBy'

}

Meteor.methods({
  submitVerifyForm(form) {
    var tokenAccount = form.daoTokenAccount.value;
    return checkDAOAccountExists(tokenAccount).then((tokens)=>{
      if(tokens){
        return tokens;
      } else {
        return false
      }
    });
  }
})
