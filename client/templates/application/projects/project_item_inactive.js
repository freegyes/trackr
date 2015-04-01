Template.inactiveProjectItem.helpers({
  boardName: function (boardId) {
    return Boards.findOne({_id: boardId}).name;
  }
});

Template.inactiveProjectItem.events({
  'click .setProjectActive': function(e, tmpl) {
    var id = this._id;
    Notifications.success('Project is now active', 'The project: <strong>' + Projects.findOne({_id: id}).name + '</strong> is now active.');
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