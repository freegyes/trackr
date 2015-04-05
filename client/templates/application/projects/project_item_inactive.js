Template.inactiveProjectItem.events({
  'click .setProjectActive': function(e, tmpl) {
    var id = this._id;
    var boardId = Projects.findOne({_id: id}).board;
    if (Boards.findOne({_id: boardId}).status == 'inactive') {
      Notifications.success('Project is now active', 'The project: <strong>' + Projects.findOne({_id: id}).name + '</strong> is now active. To view it, make the container board: <strong>' + Boards.findOne({_id: boardId}).name + '</strong> active.');
    } else {
      Notifications.success('Project is now active', 'The project: <strong>' + Projects.findOne({_id: id}).name + '</strong> is now active. <br /> <a href=\"/boards/' + boardId + '\">Click here to view it on its board.</a>');
    };
    Projects.update(id, {$set: {status: "active"}});
  },
  'click .deleteProject': function() {
    var id = this._id;
    var name = Projects.findOne({_id: id}).name;
    bootbox.confirm("Are you sure you want to delete the project: " + name + "?", function(result) {
      if (result) {
        Meteor.call('deleteProject', id, function(error, result) {
          // show notifications
          if (error) {
            Notifications.error('Something is not right.', error.reason);
          } else {
            Notifications.warn('Project removed', 'Project <strong>' + name + "</strong> and its goals were removed.");    
          }
        });
      }
    })
  }
})