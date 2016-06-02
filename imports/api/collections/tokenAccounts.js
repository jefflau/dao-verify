const TokenAccounts = new Mongo.Collection('tokenAccounts');

export createTokenAccount = function(address, accountId){
  TokenAccounts.insert({
    address: address
    verified: false,
    expired: false,
    blockExpiry: currentBlockNumber + 100,
    blockRegistered: currentBlockNumber,
  });
}

export TokenAccounts;
