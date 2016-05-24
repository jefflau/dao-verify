import { Web3 } from 'meteor/ethereum:web3';
import { httpPromise } from '../imports/helpers/helperPromises';
const etherScanAPI = `https://api.etherscan.io/api?`;
const APIToken = `YourApiKey`;

export function getCurrentBlockNumber(){
  return new Promise(function(resolve, reject){

  })
}

export function checkDAOAccountExists(account){

  let promise = httpPromise("GET", etherScanAPI,
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
          return tokens
        }
      } else {
        return false
      }
    })
  return promise;
}
