Template.boardItem.helpers({
  projectsCount: function() {
    return Projects.find({board: this._id, status: "active"}).count();
  },
  goalsCount: function() {
    return Goals.find({board: this._id}).count();
  }
})

Template.boardItem.events({
  'click .list-group-item': function(e, tmpl) {
    e.preventDefault();
    // only do this if the parent element was clicked
    if(e.target == e.currentTarget) {
      Session.set('boardId', this._id);
      Router.go('boardPage', {_id: this._id});
    } 
    
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
   },
   'click .setBoardName': function(e, tmpl) {
     // add board id to session
     Session.set('editing-board', this._id);
     bootbox.prompt({
       title: "Edit the name of your board:",
       value: Boards.findOne({_id: Session.get('editing-board')}).name,
       callback: function(result) {
         if (result === null) {
           Session.set('editing-board', null);
         } else {
            Boards.update(Session.get('editing-board'), {$set: {name: result}});     
            Notifications.success('Changed name', 'The name of the board was changed successfully')
         }
       }
     });
   },
   'click .setBoardInactive': function(e, tmpl) {
     Session.set('boardId', null);
     Notifications.warn('Board is now inactive', '');
     Boards.update(this._id, {$set: {status: "inactive"}});
   }
});