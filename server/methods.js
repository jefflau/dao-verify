import Todos from '../imports/collections';
import { checkDAOAccountExists, getCurrentBlock } from './blockchain';

function createAccount(){
  //getCurrentBlockNumber and add 24, will be the be 'confirmationBy'

}

Meteor.methods({
  submitVerifyForm(form) {
    return checkDAOAccountExists(form.daoTokenAccount.value).then((tokens)=>{
      if(tokens){
        return tokens + " tokens found"
      } else {
        return "no tokens found"
      }
    });
  }
})
