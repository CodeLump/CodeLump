'use strict';
var $toolbar = $('<div id="CodeLumpTemplateShell" class="CodeLumpHolder">' +
                  '<ul class="CodeLumpToolBar loggedIn">' +
                  '<li><button class="actionBtn mineBtn">' +
                  '<img src="'+chrome.extension.getURL('images/Tripwire-48.png')+'" alt=""/>' +
                  '<span class="count mineCount">{{proxMines}}</span></button></li>' +
                  '<li><button class="actionBtn caseBtn">' +
                    '<img src="'+chrome.extension.getURL('images/Suitcase-48.png')+'" alt=""/>' +
                  '<span class="count caseCount">{{cases}}</span></button></li>' +
                  '<li><button class="actionBtn docBtn">' +
                  '<img src="'+chrome.extension.getURL('images/Documents-48.png')+'" alt=""/>' +
                  '<span class="count docCount">{{docs}}</span></button></li>' +
                  '<li class="short"><span class="cash">${{cash}}</span></li>' +
                  //'<li><button class="actionBtn" disabled><span class="armor count">{{armor}}</span></button></li>' +
                  '</ul>' + //TODO logout button
                  '' +
                  '<ul class="CodeLumpToolBar loggedOut">' +
                  '<li><button class="actionBtn loginBtn">'+
                  'Start!</button></li>' +
                  '</ul></div>');
$toolbar.prependTo('body');

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
  //TODO move to background
  if (Number.parseInt($('.mineCount').html())<1) alert('You have no Proximity Mines!'); //TODO make less horrible and alerting
  else {
    chrome.runtime.sendMessage({reqType: 'placeMine', url: document.URL}, function(response){

      updateHUD(JSON.parse(response).user);
    });
  }
});
$('.loginBtn').click(function() {
  location.href = 'http://codelump.parseapp.com/#'+encodeURI(document.URL);
});

function updateHUD(user){
  $('.mineCount').html(user.proxMines);
  $('.caseCount').html(user.cases);
  $('.docCount').html(user.docs);
  $('.cash').html(user.cash);
}
(function getUserInfo(){
  chrome.runtime.sendMessage({reqType: 'getUser'}, function(user){
    user = JSON.parse(user);
    console.log(user);
    updateHUD(user);
  });
})();
setInterval(getUserInfo, 2*60*1000); //every 2 minutes, force an update