Meteor.publish('views', function() {
  return Views.find({});
});

Meteor.publish('boards', function() {
  var email = Meteor.users.findOne(this.userId).emails[0].address;
  return Boards.find({ $or: [{owner: this.userId}, {hasAccess: email} ] });
});

Meteor.publish('projects', function() {
  var email = Meteor.users.findOne(this.userId).emails[0].address;
  var boards = {};
  var boardsQuery = { $or: []};
  // build all boards that the user has access to
  Boards.find({ $or: [{owner: this.userId}, {hasAccess: email} ] }).map(function (post) {
    boards = {board: post._id};
    boardsQuery.$or.push(boards);  
  });
  return Projects.find(boardsQuery);
});

Meteor.publish('goals', function() {
  var email = Meteor.users.findOne(this.userId).emails[0].address;
  var boards = {};
  var boardsQuery = { $or: []};
  // build all boards that the user has access to
  Boards.find({ $or: [{owner: this.userId}, {hasAccess: email} ] }).map(function (post) {
    boards = {board: post._id};
    boardsQuery.$or.push(boards);  
  });
  return Goals.find(boardsQuery);
});