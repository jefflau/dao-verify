import { Accounts } from '../imports/collections';

Meteor.publish('getAccount', (id) => {
  return Accounts.find({_id: id})
})
