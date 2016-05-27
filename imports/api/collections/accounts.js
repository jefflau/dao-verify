const Accounts = new Mongo.Collection('accounts');

import CONFIG from '../../config/config';

export function getAllUnverified(){
  return Accounts.find({verified: false})
}

export function createAccount(form, currentBlockNumber){

  if(Accounts.find({daoTokenAccount: form.daoTokenAccount, verified: false}).count() > 0) {
    throw new Meteor.Error("account-pending-approval", "This account is pending approval. If you made this request please make the 1 wei transaction to");;
  }

  if(Accounts.find({daoTokenAccount: form.daoTokenAccount, verified: true}).count() > 0) {
    throw new Meteor.Error("account-already-registered", "This account already has a DAOhub user associated with it");;
  }

  if(Accounts.find({daoHubForumUsername: form.daoHubForumUsername}).count() > 0) {
    throw new Meteor.Error("dao-account-pending-approval", "This DAOhub forum username is pending approval. If you made this request please make a 1 wei transaction to " + CONFIG.verifierAddress);;
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
