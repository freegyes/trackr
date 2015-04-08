Boards = new Mongo.Collection('boards');

Meteor.methods({
  boardInsert: function(attributes) {
    check(attributes, {
      name: String
    });
    var user = Meteor.user();
    var board = _.extend(attributes, {
      owner: user._id,
      submitted: new Date(),
      status: "active",
      hasAccess: []
    });

    var boardId = Boards.insert(board);

    return {
      _id: boardId
    };
  },
  deleteBoard: function(id) {
    check(id, String);
    if (Meteor.user()._id == Boards.findOne({_id: id}).owner) {
      Boards.remove(id);
      // remove all connected projects and goals
        Projects.remove({board: id})
        Goals.remove({board: id})
      return id;  
    } else {
      throw new Meteor.Error(403, 'Permission denied', 'You don\'t have permission to delete this board.');
      return false;
    }
  },
  updateBoardStatus: function(id, operation) {
    check(id, String);
    check(operation, Object);
    if (Meteor.user()._id == Boards.findOne({_id: id}).owner) {
      Boards.update(id, operation);
      return true;
    } else {
      throw new Meteor.Error(403, 'Permission denied', 'You don\'t have permission to make this board inactive.');
      return false;
    }
  },
  updateBoardName: function(id, operation) {
    check(id, String);
    check(operation, Object);
    Boards.update(id, operation);
    return true;
  },
  updateBoardAccess: function(id, operation) {
    check(id, String);
    check(operation, Object);
    if (Meteor.user()._id == Boards.findOne({_id: id}).owner) {
      Boards.update(id, operation);
      return true;
    } else {
      throw new Meteor.Error(403, 'Permission denied', 'You can only share your own boards.');
      return false;
    }
  }
});