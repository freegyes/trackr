Template.inactiveBoardItem.events({
  'click .setBoardActive': function(e, tmpl) {
    var id = this._id;
    var operationObject = {$set: {status: "active"}};
    Meteor.call('updateBoardStatus', id, operationObject, function (error, result) {
      if (error) {
        Notifications.error(error.reason, error.details);
      } else {
        Notifications.success('Board is now active', 'The board: <strong>' + Boards.findOne({_id: id}).name + '</strong> is now active. <br /> <a href=\"/boards/' + Boards.findOne({_id: id})._id + '\">Click here to visit the board.</a>');       
      }
    });    
  },
  'click .deleteBoard': function() {
    var id = this._id;
    var name = Boards.findOne({_id: id}).name;
    bootbox.confirm("Are you sure you want to delete the board: " + name + "?", function(result) {
      if (result) {
        Meteor.call('deleteBoard', id, function(error, result) {
          // show notifications
          if (error) {
            Notifications.error(error.reason, error.details);
          } else {
            Notifications.warn('Board removed', 'Board <strong>' + name + "</strong> and its projects and goals were removed.");    
          }
        });  
      }
    });
  }
})