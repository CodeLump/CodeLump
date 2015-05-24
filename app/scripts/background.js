'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
chrome.runtime.onMessage.addListener(function(request, sender, respond){
  if (request.reqType == 'getLoginInfo'){
    chrome.cookies.getAll({
      url: 'http://codelump.parseapp.com/'
    }, function(cookies){
      console.log(cookies);
      respond(cookies);
    });
    return true;
  }

});
