const Accounts = new Mongo.Collection('accounts');

export function getAllUnverified(){
  return Accounts.find({verified: false})
}

export default Accounts;
