Template.inactiveProjectItem.helpers({
  boardName: function (boardId) {
    return Boards.findOne({_id: boardId}).name;
  }
});

Template.inactiveProjectItem.events({
  'click .setProjectActive': function(e, tmpl) {
    Notifications.success('Project is now active', '');
    Projects.update(this._id, {$set: {status: "active"}});
  },
  'click .deleteProject': function() {
    var id = this._id;
    bootbox.confirm("Are you sure you want to do this?", function(result) {
      if (result) {
        Projects.remove(id);
        Meteor.call('deleteGoals', id, function(error, result) {
          // show notifications
          if (error) Notifications.error('Something is not right.', error.reason);
        });  
        Notifications.warn('Project and its goals were removed', '');
        Session.set('projectId', null);
      }
     });
   }
})