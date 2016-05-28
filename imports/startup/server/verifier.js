import Accounts from '../../api/collections/accounts';
import VerifierConfig from '../../api/collections/verifierConfig';
import CONFIG from '../../config/config';
import { getCurrentBlockNumber, getControlAccountTransactions, getAccountTransactions } from '../../api/server/blockchain';
import discourseAPI from '../../api/server/discourseAPI';

const { discourse } = CONFIG;

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
        lastTransactionProcessed: null
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

  processExpiredAccounts(accounts){
    console.log('Processing expired accounts');
    accounts.map((account)=>account._id)
      .forEach((id)=>
        Accounts.update(id, {
          $set: { expired: true }
        })
      )
  }

  processUnexpiredAccounts(accounts, relevantTxs){
    console.log('Processing unexpired accounts', accounts);
    var verifiedAccounts = new Set();
    relevantTxs.forEach(tx=>{
      accounts.forEach(account=>{
        //Make sure that transaction was made after account was registered
        if(tx.from === account.daoTokenAccount.toLowerCase() && tx.blockNumber > account.blockRegistered){
          verifiedAccounts.add(account)
        }
      })
    })

    return Array.from(verifiedAccounts)
  }

  verifyAccounts(accounts){
    console.log('Adding Verified accounts to DB', accounts)
    accounts.map((account)=>account._id)
      .forEach((id)=>
        Accounts.update(id, {
          $set: { verified: true }
        })
      )
  }

  checkAccounts(){
    console.log('Check accounts loop');
    Promise.all([
      getControlAccountTransactions(),
      getCurrentBlockNumber()
    ]).then(values => {
      let allAccounts = Accounts.find({}).fetch();
      let accounts = Accounts.find({verified: false, expired: false}).fetch();
      let txs = values[0];
      let currentBlockNumber = values[1];
      let verifiedAccounts;

      //filter txs
      let relevantTxs = this.getRelevantTransactions(txs, currentBlockNumber);

      let expiredAccounts = [];
      let unexpiredAccounts = [];
      console.log("ALL ACCOUNTS", allAccounts);
      console.log("accounts", accounts);

      accounts.forEach((account)=>{
        if(account.expiryBlock > currentBlockNumber) {
          expiredAccounts.push(account)
        } else {
          unexpiredAccounts.push(account);
        }
      });

      verifiedAccounts = this.processUnexpiredAccounts(unexpiredAccounts, relevantTxs);
      this.processExpiredAccounts(expiredAccounts)

      console.log("Accounts to verify", verifiedAccounts)
      this.verifyAccounts(verifiedAccounts)

    }).catch((err)=>console.error(err))
  }

  start() {
    console.log('starting verifier');
    //Meteor.setInterval(()=>this.checkAccounts(), 15 * 1000);

    // discourseAPI.getUserId('auryn_macmillan')
    //   .then(userId => {
    //     return discourseAPI.updateUserTrustLevel(userId, discourse.tokenHolderLevel)
    //   })
    //   .catch((err)=> console.log(error))
    //
    // discourseAPI.grantBadge('auryn_macmillan', 100)
    //   .then(data => console.log('GRANT BAD', data))

  }
}

export default Verifier
