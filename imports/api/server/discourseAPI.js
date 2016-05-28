import CONFIG from '../../config/config';
import { httpPromise } from '../../helpers/helperPromises';

class discourseAPI {
  constructor({url, apiKey}){
    this.url = url;
    this.apiKey = apiKey;
  }

  getUser(username){
    console.log('in get username')
    let url = `${this.url}users/${username}.json`;
    return httpPromise('GET', url, {

    }).then((data)=> console.log(data))
      .catch(err=> console.error(err));
  }
}

const options = {
  apiKey: CONFIG.discourse.apiKey,
  url: CONFIG.discourse.url
}

export default new discourseAPI(options);
