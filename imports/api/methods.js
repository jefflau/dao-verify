import Accounts from './collections/accounts';

if(Meteor.isServer){
  var { checkDAOAccountExists, getCurrentBlock } = require('./server/blockchain');
}

function createAccount(form){
  //getCurrentBlockNumber and add 24, will be the be 'confirmationBy'
  if(Accounts.find({daoTokenAccount: form.daoTokenAccount}).count() > 0) {
    console.log('account already exists')
  }

  return Accounts.insert({
    ...form,
    verified: false
  })
}

Meteor.methods({
  submitVerifyForm(form) {
    if (this.isSimulation) {
      return;
    }

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
});
