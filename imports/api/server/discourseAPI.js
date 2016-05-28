import CONFIG from '../../config/config';
import { httpPromise } from '../../helpers/helperPromises';

class discourseAPI {
  constructor({url, apiKey, apiUsername}){
    this.url = url;
    this.apiKey = apiKey;
    this.apiUsername = apiUsername;

    this.defaultQuery = `api_key=${this.apiKey}&api_username=${this.apiUsername}`;
  }

  getUser(username){

    let url = `${this.url}users/${username}.json`;
    return httpPromise('GET', url, {});
  }

  getUserId(username){

    return this.getUser(username)
      .then((res)=> res.data.user.id)
  }

  updateUserTrustLevel(userId, level){
    let url = `${this.url}admin/users/${userId}/trust_level`;
    let options = {
      params: {
        user_id: userId,
        level: level
      },
      query: this.defaultQuery
    };

    return httpPromise('PUT', url, options);
  }
}

const options = {
  apiKey: CONFIG.discourse.apiKey,
  url: CONFIG.discourse.url,
  apiUsername: CONFIG.discourse.apiUsername
}

export default new discourseAPI(options);
