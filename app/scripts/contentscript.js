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
$('.CodeLumpToolBar .mineBtn').click(function(){
  if (Number.parseInt($('.CodeLumpToolBar .mineCount').html())<1) alert('You have no Proximity Mines!'); //TODO make less horrible and alerting
  else {
    chrome.runtime.sendMessage({reqType: 'placeMine', url: location.host+location.pathname}, function(response){
      updateHUD(JSON.parse(response).user);
      alert('Mine placed');
    });
  }
});
$('.CodeLumpToolBar .caseBtn').click(function(){
  if (Number.parseInt($('.CodeLumpToolBar .caseCount').html())<1) alert('You have no Cases!'); //TODO make less horrible and alerting
  else {
    chrome.runtime.sendMessage({reqType: 'placeCase', url: location.host+location.pathname}, function(response){
      updateHUD(JSON.parse(response).user);
      alert('Case placed');
    });
  }
});
$('.CodeLumpToolBar .docBtn').click(function(){
  if (Number.parseInt($('.CodeLumpToolBar .docCount').html())<1) alert('You have no Documents!'); //TODO make less horrible and alerting
  else {
    chrome.runtime.sendMessage({reqType: 'placeDocs', url: location.host+location.pathname,
      toUrl: prompt('To where would you like to direct the spies?', 'http://codelump.com/'),msg: prompt('What is your message?', 'Check out this intel!')}, function(response){
      updateHUD(JSON.parse(response).user);
      alert('Documents placed');
    });
  }
});
$('.CodeLumpToolBar .loginBtn').click(function() {
  chrome.runtime.sendMessage({reqType: 'openOptions'});
});


function updateHUD(user){
  $('.CodeLumpToolBar .mineCount').html(user.proxMines);
  $('.CodeLumpToolBar .caseCount').html(user.cases);
  $('.CodeLumpToolBar .docCount').html(user.docs);
  $('.CodeLumpToolBar .cash').html('$'+user.cash);
}
function getUserInfo(){
  chrome.runtime.sendMessage({reqType: 'getUser'}, function(user){
    user = JSON.parse(user);
    if (user && user.username){
      $('.CodeLumpToolBar.loggedOut').hide();
    } else {
      $('.CodeLumpToolBar.loggedIn').hide();
    }
    console.log(user);
    updateHUD(user);
  });
}
getUserInfo();
setInterval(getUserInfo, 2*60*1000); //every 2 minutes, force an update

chrome.runtime.sendMessage({reqType: 'checkPage', url: location.host+location.pathname}, function(res){
  var user = JSON.parse(res).user;
  var items = JSON.parse(res).items;

  if(items.mine){
    console.log(items.mine);
  }
  if(items.docs){
    console.log(items.docs);
  }
  if(items.foundCase){
    console.log(items.foundCase);
  }

  updateHUD(user);
});