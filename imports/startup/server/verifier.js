import {
  recordDiscourseUpdate,
  addAddressToAccount,
  getForumUsername
} from '../../api/collections/daoAccounts';
import TokenAddresses from '../../api/collections/tokenAddresses';
import VerifierConfig from '../../api/collections/verifierConfig';
import CONFIG from './config';
import { getCurrentBlockNumber, getControlAccountTransactions, getAccountTransactions } from '../../api/server/blockchain';
import discourseAPI from '../../api/server/discourseAPI';

const { discourse } = CONFIG;

class Verifier {
  constructor(){
    console.log('constructing verifier')
    if(VerifierConfig.find().count() === 0){
      this.setupVerifier()
    }
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

    // console.log("RELEVANT TX: ", relevantTxs);
    return relevantTxs;
  }

  processExpiredAddresses(addresses){
    console.log('Processing expired addresses');
    addresses.map((address)=>address._id)
      .forEach((id)=>
        TokenAddresses.remove(id)
      )
  }

  processUnexpiredAddresses(addresses, relevantTxs){
    console.log('Processing unexpired accounts', addresses);
    let verifiedAddresses = new Set();
    relevantTxs.forEach(tx=>{
      addresses.forEach(address=>{
        //Make sure that transaction was made after account was registered
        if(tx.from === address.address.toLowerCase() && tx.blockNumber > address.blockRegistered){
          verifiedAddresses.add(address)
        }
      })
    })

    return Array.from(verifiedAddresses)
  }

  updateDiscourse(tokenAddress){
      let daoHubForumUsername = getForumUsername(tokenAddress.daoAccountId);
      console.log("Updating Discourse account for ", daoHubForumUsername);
      let p1 = discourseAPI.getUserId(daoHubForumUsername)
        .then(userId => {
          return discourseAPI.addUserToGroup(userId, CONFIG.discourse.DTHGroupId)
        });

      let p2 = discourseAPI.grantBadge(daoHubForumUsername, 100)

      Promise.all([p1, p2]).then(()=>{
        recordDiscourseUpdate(tokenAddress.daoAccountId);
      }).catch((err)=> console.log(error));
  }

  verifyAccounts(addresses){
    console.log('Verifying accounts and updating discourse for these addresses:', addresses)
    addresses.forEach((address)=>
      TokenAddresses.update(address._id, {
        $set: { verified: true }
      }, ()=>{
        this.updateDiscourse(address)
        addAddressToAccount(address)
      })
    )
  }

  checkAccounts(){
    Promise.all([
      getControlAccountTransactions(),
      getCurrentBlockNumber()
    ]).then(values => {
      let allTokenAddresses = TokenAddresses.find({}).fetch();
      let tokenAddresses = TokenAddresses.find({verified: false, expired: false}).fetch();
      let txs = values[0];
      let currentBlockNumber = values[1];
      let verifiedAddresses;

      //filter txs
      let relevantTxs = this.getRelevantTransactions(txs, currentBlockNumber);

      let expiredAddresses = [];
      let unexpiredAddresses = [];
      console.log("ALL tokenAddresses", allTokenAddresses);
      console.log("unverified tokenAddresses", tokenAddresses);
      console.log("currentBlockNumber", currentBlockNumber)

      tokenAddresses.forEach((address)=>{
        if(currentBlockNumber > address.expiryBlock) {
          expiredAddresses.push(address)
        } else {
          unexpiredAddresses.push(address);
        }
      });

      verifiedAddresses = this.processUnexpiredAddresses(unexpiredAddresses, relevantTxs);
      this.processExpiredAddresses(expiredAddresses)

      if(verifiedAddresses.length > 0){
        this.verifyAccounts(verifiedAddresses)
      }

    }).catch((err)=>console.error(err))
  }

  start() {
    console.log('starting verifier');
    Meteor.setInterval(()=>this.checkAccounts(), 15 * 1000);
  }
}

export default Verifier
