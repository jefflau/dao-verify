import { httpPromise } from '../../helpers/helperPromises';
const etherScanAPI = `https://api.etherscan.io/api?`;
const APIToken = `YourApiKey`;
import CONFIG from '../../config/config';

function getAccountTransactions(account){
  let options = {
    params: {
      module: "account",
      action: "txlist",
      apikey: "YourApiKeyToken",
      address: account,
      sort: "desc"
    }
  }
  let transactionsPromise = httpPromise("GET", etherScanAPI, options).then((res)=>{
      if(res.statusCode === 200) {
        return res.data.result
      } else {
        throw new Meteor.Error("api-call-failed", "api call failed")
      }
    }).catch(err => console.error(err.reason))

  return transactionsPromise;
}

export function getCurrentBlockNumber(){
  var options = {
    params: {
      module: "proxy",
      action: "eth_blockNumber",
      apikey: "YourApiKeyToken"
    }
  }
  let blockNumberPromise = httpPromise("GET", etherScanAPI, options).then((res)=>{
      if(res.statusCode === 200) {
        return parseInt(res.data.result, 16)
      } else {
        return false
      }
    })

  return blockNumberPromise;
}

export function getControlAccountTransactions(){
  return getAccountTransactions(CONFIG.verifierAddress);
}

export function checkDAOAccountExists(account){
  let options = {
    params: {
        module: 'account',
        action: 'tokenbalance',
        tokenname: 'thedao',
        apikey: 'YourApiKey',
        address: account
    }
  }
  let tokensPromise = httpPromise("GET", etherScanAPI, options
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
