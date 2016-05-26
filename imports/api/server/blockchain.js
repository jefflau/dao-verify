import { Web3 } from 'meteor/ethereum:web3';
import { httpPromise } from '../../helpers/helperPromises';
const etherScanAPI = `https://api.etherscan.io/api?`;
const APIToken = `YourApiKey`;
const verifierAccount = `0x0E90E3EeC93B3d31a51A8d7eDdb4f161f0001D84`;

export function getCurrentBlockNumber(){
  let blockNumberPromise = httpPromise("GET", etherScanAPI, {
    module: "proxy",
    action: "eth_blockNumber",
    apikey: "YourApiKeyToken"
  }).then((res)=>{
      if(res.data.status === "1") {
        return parseInt(res.data.result, 16)
      } else {
        return false
      }
    })

  return blockNumberPromise;
}

function getAccountTransactions(account){
  let transactionsPromise = httpPromise("GET", etherScanAPI, {
    module: "account",
    action: "txlist",
    apikey: "YourApiKeyToken",
    address: account,
    sort: "desc"
  }).then((res)=>{
      if(res.data.status === "1") {
        return res.data.result
      } else {
        throw new Meteor.Error("api-call-failed", "api call failed")
      }
    }).catch(err => console.error(err.reason))
    
  return transactionsPromise;
}

export function getControlAccountTransactions(){
  return getAccountTransactions(verifierAccount);
}

export function checkDAOAccountExists(account){

  let tokensPromise = httpPromise("GET", etherScanAPI,
      {
          module: 'account',
          action: 'tokenbalance',
          tokenname: 'thedao',
          apikey: 'YourApiKey',
          address: account
      }
    ).then((res)=>{
      if(res.data.status === "1") {
        var tokens = parseInt(res.data.result);

        if(tokens === 0) {
          return false
        } else {
          return tokens/10000000000000000
        }
      } else {
        return false
      }
    })

  return tokensPromise;
}
