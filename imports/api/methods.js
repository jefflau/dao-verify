import Accounts, { createAccount } from './collections/accounts';

if(Meteor.isServer){
  var { checkDAOAccountExists, getCurrentBlockNumber } = require('./server/blockchain');
  var CONFIG = require('../startup/server/config').default;

}

Meteor.methods({
  getConfig(){
    if (this.isSimulation) {
      return false;
    }

    return {
      verifierAddress: CONFIG.verifierAddress,
      amountofBlocksToWait: CONFIG.amountofBlocksToWait
    }
  },
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
      console.log(values);
      if(tokens){
        let userId = createAccount(form, currentBlockNumber, tokens);
        return {
          tokens,
          userId
        }
      } else {
        throw new Meteor.Error("no-tokens", "This account has no tokens associated with it");
      }
    }).then(({userId, tokens})=>{
      return {
        ...form,
        tokens,
        userId
      }
    })
    .catch((err)=> {
      console.error(err)
      throw err;
    });
  }
});
