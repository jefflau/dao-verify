import Accounts from './collections/accounts';

if(Meteor.isServer){
  var { checkDAOAccountExists, getCurrentBlock } = require('./server/blockchain');
}

function createAccount(form){
  if(Accounts.find({daoTokenAccount: form.daoTokenAccount}).count() > 0) {
    throw new Meteor.Error("account-already-registered", "This account already has a DAOhub user associated with it");;
  }

  if(Accounts.find({daoHubForumUsername: form.daoHubForumUsername}).count() > 0) {
    throw new Meteor.Error("dao-account-already-registered", "This DAOhub forum username has already been registered");;
  }

  return Accounts.insert({
    ...form,
    verified: false
  });
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
    });
  }
});
