'use strict';
Parse.initialize('QoVOsIEyAMZ7g5wF1RSCblOIY7VieBl4O5DFmLT4', 'SbF6YcSmy3ykFEUh9ANXMOLUOSdGg9w5E1J0mLCX');

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
chrome.runtime.onMessage.addListener(function(request, sender, respond){
  var respondJSON = function(x) {respond(JSON.stringify(x))};
  console.log(request.reqType);
  methods[request.reqType](request, sender, respondJSON);
  return true;
});


var methods = {};
methods.getUser = function(request, sender, respond) {
  chrome.storage.sync.get(['CLUser', 'CLPass'], function(config){
   // console.log(config);
    if (!config) respond('err: no configured user');
    else if (!Parse.User.current()){
      Parse.logIn(config.CLUser, config.CLPass).then(function(user) {
        respond(user);
      }, function (err){
        respond(err);
      })
    } else{
      Parse.User.current().fetch().then(respond);
    }
  });
};
methods.getLoginInfo = function(request, sender, respond) {
  chrome.storage.sync.get(['CLUser', 'CLPass'], function(config){
    if (!config) respond('err: no configured user');
    else respond(config);
  });
};
methods.placeMine = function(request, sender, respond){
  console.log('placing a mine at '+request.url);
  Parse.Cloud.run('placeMine', {url: request.url}).then(function(result) {
    console.log(result.mine);
    respond(result);
  }, function(error){
    respond(error);
  });
}