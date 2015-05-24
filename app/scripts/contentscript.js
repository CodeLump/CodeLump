'use strict';
Parse.initialize('QoVOsIEyAMZ7g5wF1RSCblOIY7VieBl4O5DFmLT4', 'SbF6YcSmy3ykFEUh9ANXMOLUOSdGg9w5E1J0mLCX');

var $toolbar =
  $('<div class="CodeLumpHolder">' +
    '<ul class="CodeLumpToolBar">' +
      '<li><button class="actionBtn">TripMine</button></li>' +
      '<li><button class="actionBtn">Case</button></li>' +
      '<li><button class="actionBtn">Documents</button></li>' +
      '<li><span class="cash">$123</span></li>' +
      '<li><span class="armor">8</span></li>' +
    '</ul>' +
    '</div>');
$toolbar.prependTo('body');
//animate toolbar slide right

$('.CodeLumpToolBar').stop().animate({'right':'-58px'},600);

$($toolbar).hover(
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'0'},200);
  },
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'-58px'},200);
  }
);

console.log('\'Allo \'Allo! Content script');
