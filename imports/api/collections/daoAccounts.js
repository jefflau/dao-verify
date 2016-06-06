const DAOAccounts = new Mongo.Collection('DAOAccounts');
import TokenAddresses, { createTokenAddress } from './tokenAddresses';

if(Meteor.isServer){
  var CONFIG = require('../../startup/server/config').default;
}

export function recordDiscourseUpdate(id){
  return DAOAccounts.update(id, {
    $set: {
      "daoHubForum.DTHGroup": true,
      "daoHubForum.DTHBadge": true
    }
  })
}

export function addAddressToAccount(tokenAddress){
  return DAOAccounts.update(tokenAddress.daoAccountId, {
    $addToSet: {
      tokenAddresses: tokenAddress.address
    },
    $set: {
      verified: true
    }
  })
}

export function getForumUsername(id){
  return DAOAccounts.findOne(id).daoHubForumUsername;
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
      DTHGroup: false,
      DTHBadge: false
    }
  });

  createTokenAddress(daoTokenAccount, accountId, currentBlockNumber, tokens);

  return accountId;
}

export default DAOAccounts;
