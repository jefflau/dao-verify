import { Web3 } from 'meteor/ethereum:web3';
import { HTTP } from 'meteor/http';
const etherScanAPI = `https://api.etherscan.io/api?`;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

export function checkDAOAccountExists(account){
  var res = HTTP.call("GET", etherScanAPI,
    {
      params: {
        module: 'account',
        action: 'tokenbalance',
        tokenname: 'thedao',
        apikey: 'YourApiKey',
        address: account
      }
    }
  );

  console.log(res)

  if(res.data.status === "1") {
    var tokens = parseInt(res.data.result);

    console.log("tokens ",tokens)

    if(tokens === 0) {
      return false
    } else {
      return tokens
    }
  } else {
    return false
  }
}
