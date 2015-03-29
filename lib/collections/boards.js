Boards = new Mongo.Collection('boards');

Boards.allow({
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
  boardInsert: function(boardAttributes) {
    check(boardAttributes, {
      name: String
    });
    // var user = Meteor.user();
    var board = _.extend(boardAttributes, {
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
    Projects.remove({board: id})
    Goals.remove({board: id})
    return true;
  }
});