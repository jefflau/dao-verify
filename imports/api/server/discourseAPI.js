import CONFIG from '../../startup/server/config';
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

  grantBadge(username, badgeId){
    let url = `${this.url}user_badges`;
    let options = {
      params: {
        username: username,
        badge_id: badgeId
      },
      query: this.defaultQuery
    };

    console.log('GRANT BADGE FUNC')

    return httpPromise('POST', url, options);
  }

  addUserToGroup(userId, groupId){
    let url = `${this.url}admin/users/${userId}/groups`;
    let options = {
      params: {
        group_id: groupId
      },
      query: this.defaultQuery
    }

    console.log(url)

    return httpPromise('POST', url, options);
  }

  removeUserFromGroup(userId, groupId){
    let url = `${this.url}groups/${groupId}/members.json`
    let options = {
      params: {
        user_id: userId
      },
      query: this.defaultQuery
    }

    return httpPromise('DELETE', url, options);
  }

  getUserBadges(username){
    let url = `${this.url}/user-badges/${username}.json`;

    let options = {
      query: this.defaultQuery
    }

    return httpPromise('GET', url, options);
  }

  getUserBadgeId(badgeId, userBadges){
    return userBadges.filter((badge)=>badge.badge_id === badgeId)[0].id;
  }

  removeBadgeFromUser(badgeId, username){
    return this.getUserBadges(username).then((res)=>{
      let userBadgeId = this.getUserBadgeId(badgeId, res.data.user_badges);

      console.log(userBadgeId)
      let url = `${this.url}user_badges/${userBadgeId}`;

      let options = {
        query: this.defaultQuery
      }

      return httpPromise('DELETE', url, options);
    });
  }

  checkUsernameExists(username){
    return this.getUser(username).then(data=>{
      console.log('inside then', data)
      if(data.statusCode === 200){
        return true;
      }
    }).catch(err=> {
      console.log('inside error', err)
      throw new Meteor.Error('username-not-found', "DAOhub forum username not found")
    })
  }

}

const options = {
  apiKey: CONFIG.discourse.apiKey,
  url: CONFIG.discourse.url,
  apiUsername: CONFIG.discourse.apiUsername
}

export default new discourseAPI(options);
