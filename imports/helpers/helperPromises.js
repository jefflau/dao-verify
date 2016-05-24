import { HTTP } from 'meteor/http';

export function httpPromise(type, url, params){
  var promise = new Promise(http);

  function http(resolve,reject){
    HTTP.call(type, url,
      {
        params
      }, function(err, res){
        if(err)
          reject(err)
        else {
          resolve(res)
        }
      })
  };
  return promise;
}


export function callMethodPromise(name, ...args){
  return new Promise(function(resolve, reject){
    Meteor.call(name, ...args, function(err, data){
      if(err){
        reject(err)
      } else {
        resolve(data)
      }
    });
  });
}
