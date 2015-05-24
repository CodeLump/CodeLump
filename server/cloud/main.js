var ProxMine = Parse.Object.extend('ProxMine');
//here's some free shit for you!
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("proxMines") && request.object.get("proxMines")!==0) {
    request.object.set("proxMines", 5);
  }
  if (!request.object.get("cases" && request.object.get("cases")!==0)) {
    request.object.set("cases", 5);
  }
  if (!request.object.get("docs" && request.object.get("docs")!==0)) {
    request.object.set("docs", 5);
  }
  if (!request.object.get("cash" && request.object.get("cash")!==0)) {
    request.object.set("cash", 100);
  }
console.log(request.object.get("proxMines"));
  response.success();
});
Parse.Cloud.define("hello", function(request, response) {
  response.success("CodeLump says, \"Stop poking around!\"");
});
//place a mine if you're feeling naughty!
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
      //console.log(JSON.stringify(request));
      mine.set('URL', url); //TODO: IMPORTANT: why is URL not being set?
      mine.save().then(function(mine){
        response.success({user: user, mine: mine});
      }, function(error){
        response.error(error);
      });
    }, function(error){
      response.error(error);
    });
  } else {
    response.error('No mines');
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