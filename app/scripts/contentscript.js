'use strict';
Parse.initialize("QoVOsIEyAMZ7g5wF1RSCblOIY7VieBl4O5DFmLT4", "SbF6YcSmy3ykFEUh9ANXMOLUOSdGg9w5E1J0mLCX");

var $toolbar =
  $('<div class="CodeLumpHolder">' +
    '<ul class="CodeLumpToolBar">' +
      '<li><button>TripMine</button></li>' +
      '<li><button>Case</button></li>' +
      '<li><button>Documents</button></li>' +
      '<li>${money}</li>' +
    '</ul>' +
    '</div>');
$toolbar.attr('style', 'animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0 0;background-clip:border-box;background-origin:padding-box;background-position-x:0;background-position-y:0;background:0 0/auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-collapse:separate;border-image:none;border-left:0;border-radius:0;border-right:0;border-spacing:0;border-top:0;bottom:auto;box-shadow:none;box-sizing:content-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:inline;empty-cells:show;float:none;font:400;font-family:inherit;font-size:medium;font-style:normal;font-variant:normal;font-weight:400;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:disc;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline:0;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;position:fixed;quotes:\'\\201C\' \'\\201D\' \'\\2018\' \'\\2019\';right:0;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:30%;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:68px;word-spacing:normal;z-index:99999999;');
$toolbar.find('.CodeLumpToolBar').css({
  'display': 'block',
  'list-style-type': 'none',
  'padding': 0,
  'padding-left': 15,
  'padding-right': 5,
  'background-color': 'cyan',
  'position': 'relative'
});
$toolbar.find('.CodeLumpToolBar li button').css({
  'margin-bottom': 5,
  'width': 48,
  'height': 48
});
$toolbar.prependTo('body');
//animate toolbar slide right

$('.CodeLumpToolBar').stop().animate({'right':'-53px'},600);

$($toolbar).hover(
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'0'},200);
  },
  function () {
    $('.CodeLumpToolBar').stop().animate({'right':'-53px'},200);
  }
);

console.log('\'Allo \'Allo! Content script');
