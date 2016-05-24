import { Accounts } from '../imports/collections';
import { checkDAOAccountExists, getCurrentBlock } from './blockchain';

function createAccount(form){
  //getCurrentBlockNumber and add 24, will be the be 'confirmationBy'
  return Accounts.insert(form)
}

Meteor.methods({
  submitVerifyForm(form) {
    var tokenAccount = form.daoTokenAccount;
    return checkDAOAccountExists(tokenAccount).then((tokens)=>{
      if(tokens){
        let userId = createAccount(form);
        return {
          ...form,
          tokens,
          userId
        };
      } else {
        return false
      }
    });
  }
})
