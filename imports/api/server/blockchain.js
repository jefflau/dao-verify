import { Web3 } from 'meteor/ethereum:web3';
import { httpPromise } from '../../helpers/helperPromises';
const etherScanAPI = `https://api.etherscan.io/api?`;
const APIToken = `YourApiKey`;

export function getCurrentBlockNumber(){
  let blockNumber = httpPromise("GET", etherScanAPI, {
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

  return blockNumber;
}

export function checkDAOAccountExists(account){

  let tokens = httpPromise("GET", etherScanAPI,
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

  return tokens;
}
