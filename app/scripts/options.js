
Parse.initialize('QoVOsIEyAMZ7g5wF1RSCblOIY7VieBl4O5DFmLT4', 'SbF6YcSmy3ykFEUh9ANXMOLUOSdGg9w5E1J0mLCX');

//jq shake plugin
(function ($) {
  $.fn.shake = function (options) {
    // defaults
    var settings = {
      'shakes': 2,
      'distance': 10,
      'duration': 400
    };
    // merge options
    if (options) {
      $.extend(settings, options);
    }
    // make it so
    var pos;
    return this.each(function () {
      $this = $(this);
      // position if necessary
      pos = $this.css('position');
      if (!pos || pos === 'static') {
        $this.css('position', 'relative');
      }
      // shake it
      for (var x = 1; x <= settings.shakes; x++) {
        $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
          .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
          .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
      }
    });
  };
}(jQuery));


$('#login').hide();
$('.switch').click(function() {
  $('#register').toggle();
  $('#login').toggle();
});
$('#login').submit(function(e) {
  $pass =  $('#passLogin').val();
  Parse.User.logIn($('#userLogin').val(),$pass, {
    success: function(user){
      setCookies(user.get("username"), $pass);
      alert('Logged in!');
      Parse.User.logOut();
      //location.href=decodeURI(location.hash.substr(1));
    }, error: function(user, error){
      $('#login').shake();
      throw(JSON.stringify(error));
    }
  });
  e.preventDefault();
  return false;
});
$('#register').submit(function(e) {
  var user = new Parse.User();
  $pass =  $('#pass').val();
  user.set("username", $('#user').val());
  user.set("password", $pass);
  user.set("email", $('#email').val());
  user.signUp(null, {
    success: function(user){
      setCookies(user.get("username"),  $pass);
      alert('Logged in!');
      Parse.logOut();
      //location.href=decodeURI(location.hash.substr(1));
    }, error: function(user, error){
      $('#register').shake();
      throw(JSON.stringify(error));
    }
  });
  e.preventDefault();
  return false;
});
var setCookies= function(user, pass){
  chrome.storage.sync.set({
    'CLUser': user,
    'CLPass': pass
  });
};