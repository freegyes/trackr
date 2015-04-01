Template.inactiveBoardItem.events({
  'click .setBoardActive': function(e, tmpl) {
    var id = this._id;
    Notifications.success('Board is now active', 'The board: <strong>' + Boards.findOne({_id: id}).name + '</strong> is now active.');
    Boards.update(id, {$set: {status: "active"}});
  },
  'click .deleteBoard': function() {
    var id = this._id;
    var name = Boards.findOne({_id: id}).name;
    bootbox.confirm("Are you sure you want to delete the board: " + name + "?", function(result) {
      if (result) {
        Meteor.call('deleteBoard', id, function(error, result) {
          // show notifications
          if (error) {
            Notifications.error('Something is not right.', error.reason);
          } else {
            Notifications.warn('Board removed', 'Board <strong>' + name + "</strong> and its projects and goals were removed.");    
          }
        });  
      }
    });
  }
})