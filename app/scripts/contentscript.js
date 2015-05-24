'use strict';
Parse.initialize('QoVOsIEyAMZ7g5wF1RSCblOIY7VieBl4O5DFmLT4', 'SbF6YcSmy3ykFEUh9ANXMOLUOSdGg9w5E1J0mLCX');


var $toolbar = $('<div id="CodeLumpTemplateShell" class="CodeLumpHolder"></div>');
$toolbar.prependTo('body');
var huddata = {
  mines: 0,
  cases: 0,
  docs: 0,
  cash: 500,
  armor: 8,
  loggedIn: false
};

var hud = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#CodeLumpTemplateShell',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  template:
  '{{#if loggedIn}}<ul class="CodeLumpToolBar">' +
    '<li><button class="actionBtn mineBtn">' +
      '<img src="'+chrome.extension.getURL('images/tripwire-48.png')+'" alt=""/>' +
      '<span class="count mineCount">{{mines}}</span></button></li>' +
    '<li><button class="actionBtn caseBtn">' +
      //'<img src="'+chrome.extension.getURL('images/case-48.png')+'" alt=""/>' +
      '<span class="count caseCount">{{cases}}</span></button></li>' +
    '<li><button class="actionBtn docBtn">' +
      //'<img src="'+chrome.extension.getURL('images/docs-48.png')+'" alt=""/>' +
      '<span class="count docCount">{{docs}}</span></button></li>' +
    '<li><span class="cash">${{cash}}</span></li>' +
    '<li><button class="actionBtn" disabled><span class="armor count">{{armor}}</span></button></li>' +
  '</ul>' +
  '{{else}}' +
  '<ul class="CodeLumpToolBar">' +
  '<li><button class="actionBtn loginBtn">'+
    'Start!</button></li>' +
  '</ul>' +
  '{{/if}}',

  // Here, we're passing in some initial data
  data: huddata,
  magic: true
});

if (!Parse.User.current()){
  chrome.runtime.sendMessage({reqType: 'getLoginInfo'}, function(loginInfo){
    var user, pass;
    console.log(loginInfo);
    for(var i = 0; i< loginInfo.length; i++){
      if (loginInfo[i].name == 'user') user = loginInfo[i].value;
      else if (loginInfo[i].name == 'pass') pass = loginInfo[i].value;
    }
    Parse.User.logIn(user, pass).then(function(user){
      console.log(user);
    }, function(err){
      console.log(err);
    });
    //
  });
}
/*chrome.runtime.sendMessage({reqType: 'session'}, function(cookie){
  if(cookie) {
    Parse.User.become(cookie.value).then(function(user){
      hud.set('loggedIn', true); //allows async
      chrome.runtime.sendMessage({reqType: 'newSession', newSession: Parse.User.current().getSessionToken()});
    }, function(err, user){
      console.log(err);
    });
  } else {
    Parse.User.logOut();
  }
});*/
//animate toolbar slide right
$(".CodeLumpToolBar").stop().animate({"right":"-58px"},600);
$toolbar.hover(
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'0'},200);
  },
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'-58px'},200);
  }
);
$('.mineBtn').click(function(){
  if (huddata.mines<1) alert('You have no Proximity Mines!'); //TODO make less horrible and alerting
  Parse.Cloud.run('placeMine', {url: document.URL}).then(function(result) {
    console.log(result.mine);
    --huddata.mines;
    alert('Mine planted at '+document.URL);
  }, function(error){
    throw(error);
  });
});
$('.loginBtn').click(function() {
  location.href = 'http://codelump.parseapp.com/#'+encodeURI(document.URL);
});