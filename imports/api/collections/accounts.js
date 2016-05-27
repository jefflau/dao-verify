const Accounts = new Mongo.Collection('accounts');

export function getAllUnverified(){
  return Accounts.find({verified: false})
}

export function createAccount(form, currentBlockNumber){
  if(Accounts.find({daoTokenAccount: form.daoTokenAccount}).count() > 0) {
    throw new Meteor.Error("account-already-registered", "This account already has a DAOhub user associated with it");;
  }

  if(Accounts.find({daoHubForumUsername: form.daoHubForumUsername}).count() > 0) {
    throw new Meteor.Error("dao-account-already-registered", "This DAOhub forum username has already been registered");;
  }

  return Accounts.insert({
    ...form,
    verified: false,
    expired: false,
    blockExpiry: currentBlockNumber + 100
  });
}

export default Accounts;
