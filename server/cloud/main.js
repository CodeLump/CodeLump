var ProxMine = Parse.Object.extend('ProxMine');
var Case = Parse.Object.extend('Case');
var Documents = Parse.Object.extend('Documents');
//here's some free shit for you!
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("proxMines") && request.object.get("proxMines")!==0) {
    request.object.set("proxMines", 5);
  }
  if (!request.object.get("cases") && request.object.get("cases")!==0) {
    request.object.set("cases", 5);
  }
  if (!request.object.get("docs") && request.object.get("docs")!==0) {
    request.object.set("docs", 5);
  }
  if (!request.object.get("cash") && request.object.get("cash")!==0) {
    request.object.set("cash", 100);
  }
  if (!request.object.get("benefactorCP") && request.object.get("benefactorCP")!==0) {
    request.object.set("benefactorCP", 0);
  }
  if (!request.object.get("assassinCP") && request.object.get("assassinCP")!==0) {
    request.object.set("assassinCP", 0);
  }
  if (!request.object.get("reconnoisseurCP") && request.object.get("reconnoisseurCP")!==0) {
    request.object.set("reconnoisseurCP", 0);
  }
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
    user.set('proxMines', user.get('proxMines')-1);
    user.set('assassinCP', user.get('assassinCP')+5);
    user.save().then(function(user){
      var mine = new ProxMine();
      mine.set('URL', url);
      mine.set('placer', user);
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
  var url = request.params.url;
  var user = request.user;
  if (user && user.get('cases') >= 1){
    user.set('cases', user.get('cases')-1);
    user.set('benefactorCP', user.get('benefactorCP')+5);
    user.save().then(function(user){
      var newcase = new Case();
      newcase.set('donor', user);
      //console.log(JSON.stringify(request));
      newcase.set('URL', url);
      newcase.save().then(function(newcase){
        response.success({user: user, newcase: newcase});
      }, function(error){
        response.error(error);
      });
    }, function(error){
      response.error(error);
    });
  } else {
    response.error('No cases');
  }
});
Parse.Cloud.define("placeDocs", function(request, response) {
  Parse.Cloud.useMasterKey();
  var url = request.params.url;
  var toUrl = request.params.toUrl;
  var msg = request.params.msg;
  var user = request.user;
  if (user && user.get('docs') >= 1){
    user.set('docs', user.get('docs')-1);
    user.set('reconnoisseurCP', user.get('reconnoisseurCP')+5);
    user.save().then(function(user){
      var doc = new Documents();
      doc.set('dropper', user);
      //console.log(JSON.stringify(request));
      doc.set('URL', url);
      doc.set('msg', msg);
      doc.set('toURL', toUrl);
      doc.save().then(function(doc){
        response.success({user: user, doc: doc});
      }, function(error){
        response.error(error);
      });
    }, function(error){
      response.error(error);
    });
  } else {
    response.error('No docs');
  }
});
Parse.Cloud.define("checkPage", function(request, response){
  Parse.Cloud.useMasterKey();
  var p1 = Parse.Promise.as(1);
  var p2 = Parse.Promise.as(2);
  var p3 = Parse.Promise.as(3);
  var user = request.user;
  var url = request.params.url;
  console.log('querying for URL: '+url);
    new Parse.Query(ProxMine)
      .notEqualTo('placer', user)
      .doesNotExist('victim')
      .equalTo('URL', url)
      .ascending('createdAt')
      .first().then(function(mine){
        var items = {mine: null, foundCase: null, docs: null};
        if (mine){
          mine.set('victim', user);
          mine.save();
        }
        items.mine= mine;
        return items;
      }).then(function(items){
        new Parse.Query(Case)
          .notEqualTo('donor', user)
          .doesNotExist('recipient')
          .equalTo('URL', url)
          .ascending('createdAt')
          .first().then(function(foundCase){
            if (foundCase){
              foundCase.set('recipient', user);
              foundCase.save();
            }
            items.foundCase = foundCase;
            return items
          }).then(function(items){ //TODO: see if we can eliminate the cascading of Promise()s
            new Parse.Query(Documents)
              .notEqualTo('dropper', user)
              .doesNotExist('receiver')
              .equalTo('URL', url)
              .ascending('createdAt')
              .first().then(function(docs){
                console.log('docs  '+JSON.stringify(docs));
                if (docs){
                  docs.set('receiver', user);
                  docs.save();
                }
                items.docs = docs;
                return items;
              }).then(function(items){
                response.success({user: user, items: items});
              });
          });
      });
});