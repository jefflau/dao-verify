import Accounts from '../collections/accounts';

Meteor.publish('getAccount', (id) => {
  return Accounts.find({_id: id})
})
