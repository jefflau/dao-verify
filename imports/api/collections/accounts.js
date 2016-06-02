const Accounts = new Mongo.Collection('accounts');

if(Meteor.isServer){
  var CONFIG = require('../../startup/server/config').default;
}

export function getAllUnverified(){
  return Accounts.find({verified: false})
}

export function createAccount(form, currentBlockNumber, tokens){

  if(Accounts.find({daoTokenAccount: form.daoTokenAccount, verified: false, expired: false}).count() > 0) {
    throw new Meteor.Error("account-pending-approval", `This account is pending approval. If you made this request please make the 1 wei transaction to ${CONFIG.verifierAddress}`);;
  }

  if(Accounts.find({daoTokenAccount: form.daoTokenAccount, verified: true}).count() > 0) {
    throw new Meteor.Error("account-already-registered", "This account already has a DAOhub user associated with it");;
  }

  if(Accounts.find({daoHubForumUsername: form.daoHubForumUsername, verified: true}).count() > 0) {
    throw new Meteor.Error("dao-account-already-registered", "This DAOhub forum username has already been registered");;
  }

  if(Accounts.find({daoHubForumUsername: form.daoHubForumUsername, verified: false, expired: false}).count() > 0) {
    throw new Meteor.Error("dao-account-pending-approval", "This DAOhub forum username is pending approval. If you made this request please make a 1 wei transaction to " + CONFIG.verifierAddress);
  }

  return Accounts.insert({
    ...form,
    tokens,
    verified: false,
    expired: false,
    blockExpiry: currentBlockNumber + 100,
    blockRegistered: currentBlockNumber,
    daoHubForum: {
      DTHGroup: false
    }
  })
}

export default Accounts;
