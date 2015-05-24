var ProxMine = Parse.Object.extend('ProxMine');
Parse.Cloud.define("hello", function(request, response) {
  response.success("CodeLump says, \"Stop poking around!\"");
});
Parse.Cloud.define("placeMine", function(request, response) {
  Parse.Cloud.useMasterKey();
  var url = request.params.url;
  var user = request.user;
  if (user && user.get('proxMines') >= 1){
    user.increment('proxMines', -1);
    user.increment('assassinCP', 5);
    user.save().then(function(user){
      var mine = new ProxMine();
      mine.set('placer', user);
      mine.set('url', url);
      mine.save().then(function(mine){
        response.success({user: user, mine: mine});
      }, function(error){
        response.error(error);
      });
    }, function(error){
      response.error(error);
    });
  }
});
Parse.Cloud.define("placeCase", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user = request.user;
  if (user && user.get('cases') >= 1) {

  }
});
Parse.Cloud.define("placeDocuments", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user = request.user;
  if (user && user.get('docs') >= 1) {

  }
});