const DAOAccounts = new Mongo.Collection('DAOAccounts');
import TokenAddresses, { createTokenAddress } from './tokenAddresses';

if(Meteor.isServer){
  var CONFIG = require('../../startup/server/config').default;
}

export function getAllUnverified(){
  return DAOAccounts.find({verified: false})
}

export function verifyDaoAccount(id){
  DAOAccounts.update(id, { $set: {
    verified: true
  }})
}

export function createAccount(form, currentBlockNumber, tokens){

  let { daoTokenAccount, daoHubForumUsername } = form;
  let accountId;

  if(TokenAddresses.find({address: daoTokenAccount, verified: false, expired: false}).count() > 0) {
    throw new Meteor.Error("account-pending-approval", `This account is pending approval. If you made this request please make the 1 wei transaction to ${CONFIG.verifierAddress}`);
  }

  if(TokenAddresses.find({address: daoTokenAccount, verified: true}).count() > 0) {
    throw new Meteor.Error("account-already-registered", "This account already has a DAOhub user associated with it");;
  }

  var existingAccount = DAOAccounts.find({daoHubForumUsername: form.daoHubForumUsername}).fetch();

  if(existingAccount.length > 0) {

    createTokenAddress(daoTokenAccount, existingAccount[0]._id, currentBlockNumber, tokens)

    return existingAccount[0]._id;

  }

  accountId = DAOAccounts.insert({
    daoHubForumUsername,
    tokenAddresses: [],
    verified: false,
    daoHubForum: {
      DTHGroup: false
    }
  });

  createTokenAddress(daoTokenAccount, accountId, currentBlockNumber, tokens);

  return accountId;
}

export default DAOAccounts;
