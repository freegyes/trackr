Template.inactiveBoardItem.events({
  'click .setBoardActive': function(e, tmpl) {
    Session.set('boardId', this._id);
    Notifications.success('Board is now active', '');
    Boards.update(this._id, {$set: {status: "active"}});
  },
  'click .deleteBoard': function() {
    var id = this._id;
    bootbox.confirm("Are you sure you want to do this?", function(result) {
      if (result) {
        Meteor.call('deleteBoard', id, function(error, result) {
          // show notifications
          if (error) Notifications.error('Something is not right.', error.reason);
        });  
        Notifications.warn('Board and its goals were removed', '');
        Session.set('boardId', null);
      }
     });
   }
})