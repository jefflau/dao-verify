import Accounts from '../../api/collections/accounts';
import VerifierConfig from '../../api/collections/verifierConfig';
import { getCurrentBlockNumber, getControlAccountTransactions, getAccountTransactions } from '../../api/server/blockchain';

class Verifier {
  constructor(){
    console.log('constructing verifier')
    if(VerifierConfig.find().count() === 0){
      this.setupVerifier()
    }
    console.log(VerifierConfig.find().fetch());
    console.log(Accounts.find().fetch());
  }

  setupVerifier(){
    console.log('setting up verified');
    getCurrentBlockNumber().then((blockNumber)=> {
      VerifierConfig.insert({
        firstBlock: blockNumber,
        verified: 0,
        dateCreated: new Date(),
        lastAccountVerified: null,
        latestBlock: null,
        lastTransactionProcess: null
      })
    });
  }

  getRelevantTransactions(txs, currentBlockNumber){
    let relevantTxs = [];
    for(let i = 0; i<txs.length; i++){
      let blockDistance = currentBlockNumber - parseInt(txs[i].blockNumber)
      if(blockDistance <= 50000) {
        relevantTxs.push(txs[i])
      } else {
        break;
      }
    }

    console.log("RELEVANT TX: ", relevantTxs);
    return relevantTxs;
  }

  verifyAccounts(){
    console.log('in verify accounts');
    Promise.all([
      getControlAccountTransactions(),
      getCurrentBlockNumber()
    ]).then(values => {
      let accounts = Accounts.find({verified: false, invalid: false}).fetch();
      let txs = values[0];
      let currentBlockNumber = values[1];

      //filter txs
      let relevantTxs = this.getRelevantTransactions(txs, currentBlockNumber);

      let expiredAccounts = [];
      let unexpiredAccounts = [];

      console.log("accounts", accounts)

      accounts.forEach((account)=>{
        if(account.expiryBlock > currentBlockNumber) {
          unexpiredAccounts.push(account);
        } else {
          expiredAccounts.push(account)
        }
      });

      console.log("EXPIRED ACCOUNTS", expiredAccounts)
      console.log("UNEXPIRED ACCOUNTS", expiredAccounts)

      //dealWith ExpiredAccounts
      expiredAccounts.forEach(account=>{
        //deal with each one
      })
      //dealWith unexpiredAccounts
      unexpiredAccounts.forEach(account=>{
        //deal with each one
      })


      // if(account.blockExpired <= tx.blockNumber) {
      //
      // }
      // relevantTxs.forEach((tx)=> {
      //
      //   if(tx.to === )
      // })
    }).catch((err)=>console.error(err))
    //loop through Accounts
    //If createdBlockNumber > 100. Invalidate
    // else loop through transactions array
    // check each transaction with accountNumber
    // if match, set verified to true
    // if not continue looping
    // loop through transactions until currentBlockNumber + 100
    //check
  }

  start() {
    console.log('starting verifier');
    this.verifyAccounts();
  }
}

export default Verifier
