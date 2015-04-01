Template.boardActions.events({
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
            Notifications.warn('Board removed', 'Board <strong>' + name + "</strong> and its goals were removed.");    
          }
        });  
      }
     });
   },
   'click .setBoardName': function(e, tmpl) {
    var id = this._id;
    bootbox.prompt({
      title: "Edit the name of your board:",
      value: Boards.findOne({_id: id}).name,
      callback: function(result) {
        if (result === null) {
          return
        } else {
          Boards.update(id, {$set: {name: result}});     
          Notifications.success('Changed name', 'The name of the board was changed successfully.')
        }
      }
    });
   },
   'click .setBoardInactive': function(e, tmpl) {
     var id = this._id
     Notifications.warn('Board is now inactive', 'The board: <strong>' + Boards.findOne({_id: id}).name + '</strong> can be managed in the <a href=\"\/archives\">Archives<\/a>.');
     Boards.update(id, {$set: {status: "inactive"}});
   }
});
