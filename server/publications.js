Meteor.publish('views', function() {
  return Views.find({}, {sort: {order:1}});
});

Meteor.publish('boards', function() {
  if (this.userId) {
    var email = Meteor.users.findOne(this.userId).emails[0].address;
    return Boards.find({ $or: [{owner: this.userId}, {hasAccess: email}, {owner: "tutorial"} ] });
  } else {
    return Boards.find({owner: "tutorial"});
  };
  
});

Meteor.publish('projects', function() {
  if (this.userId) {
    var email = Meteor.users.findOne(this.userId).emails[0].address;
    var boards = {};
    var boardsQuery = { $or: []};
    // build all boards that the user has access to
    Boards.find({ $or: [{owner: this.userId}, {hasAccess: email}, {owner: "tutorial"} ] }).map(function (post) {
      boards = {board: post._id};
      boardsQuery.$or.push(boards);  
    });
    return Projects.find(boardsQuery);
  } else {
    return Projects.find({creator: "tutorial"});
  }
});

Meteor.publish('goals', function() {
  if (this.userId) {
    var email = Meteor.users.findOne(this.userId).emails[0].address;
    var boards = {};
    var boardsQuery = { $or: []};
    // build all boards that the user has access to
    Boards.find({ $or: [{owner: this.userId}, {hasAccess: email}, {owner: "tutorial"} ] }).map(function (post) {
      boards = {board: post._id};
      boardsQuery.$or.push(boards);  
    });
    return Goals.find(boardsQuery);
  } else {
    Goals.find({creator: "tutorial"});
  }
});