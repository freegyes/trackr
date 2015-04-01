Boards = new Mongo.Collection('boards');

Boards.allow({
  // this is to be fixed when user management gets implemented
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
  boardInsert: function(attributes) {
    check(attributes, {
      name: String
    });
    // var user = Meteor.user();
    var board = _.extend(attributes, {
      //userId: user._id,
      submitted: new Date(),
      status: "active",
      owner: null
    });

    var boardId = Boards.insert(board);

    return {
      _id: boardId
    };
  },
  deleteBoard: function(id) {
    check(id, String);
    Boards.remove(id);
    // remove all connected projects and goals
      Projects.remove({board: id})
      Goals.remove({board: id})
    return id;
  }
});