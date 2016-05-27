import Accounts, { createAccount } from './collections/accounts';

if(Meteor.isServer){
  var { checkDAOAccountExists, getCurrentBlockNumber } = require('./server/blockchain');

}

Meteor.methods({
  submitVerifyForm(form) {
    if (this.isSimulation) {
      return false;
    }

    var tokenAccount = form.daoTokenAccount;

    return new Promise.all([
      checkDAOAccountExists(tokenAccount),
      getCurrentBlockNumber()
    ]).then((values)=>{
      let [tokens, currentBlockNumber] = values;
      if(tokens){
        let userId = createAccount(form, currentBlockNumber);

        if(userId){
          return {
            ...form,
            tokens,
            userId
          }
        }

      } else {
        throw new Meteor.Error("no-tokens", "This account has no tokens associated with it");
      }
    }).catch((err)=> {
      console.error(err)
      throw err;
    });
  }
});
