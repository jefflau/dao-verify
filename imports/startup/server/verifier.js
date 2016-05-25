import Accounts from '../../api/collections/accounts';
import VerifierConfig from '../../api/collections/verifierConfig';
import { getCurrentBlockNumber } from '../../api/server/blockchain';

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

  verifyAccounts(){
    console.log('VERIFY ACCOUNTS', Accounts.find({verified: false}).fetch())
  }

  start() {
    console.log('starting verifier');
    this.verifyAccounts();
  }
}

export default Verifier
