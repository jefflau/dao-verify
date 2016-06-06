const TokenAddresses = new Mongo.Collection('tokenAddresses');

export function createTokenAddress(address, accountId, currentBlockNumber, tokens){
  return TokenAddresses.insert({
    address: address,
    tokens: tokens,
    daoAccountId: accountId,
    verified: false,
    expired: false,
    expiryBlock: currentBlockNumber + 100,
    blockRegistered: currentBlockNumber,
  });
}

export default TokenAddresses;
