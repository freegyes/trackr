Template.projectItem.helpers({
  state: function() {
    if (Session.equals('projectId', this._id)) {
      return "active";
    };
  }
})

Template.projectItem.events({
  'click .list-group-item': function(e, tmpl) {
    Session.set('projectId', this._id);
  },
  'click .deleteProject': function() {
    bootbox.confirm("Are you sure you want to do this?", function(result) {
      if (result) {
        Projects.remove(Session.get('projectId'));
        Meteor.call('deleteGoals', Session.get('projectId'), function(error, result) {
          // show notifications
          if (error) Notifications.error('Something is not right.', error.reason);
        });  
        Notifications.warn('Project and its goals were removed', '');
        if (Projects.findOne({status: 'active'})) {
          Session.set('projectId', Projects.findOne({status: 'active'})._id);
        } else {
          Session.set('projectId', null);
        }
      }
     });
   },
   'click .setProjectName': function(e, tmpl) {
     // add project id to session
     Session.set('editing-project', this._id);
     bootbox.prompt({
       title: "Edit the name of your project:",
       value: Projects.findOne({_id: Session.get('editing-project')}).name,
       callback: function(result) {
         if (result === null) {
           Session.set('editing-project', null);
         } else {
            Projects.update(Session.get('editing-project'), {$set: {name: result}});     
            Notifications.success('Changed name', 'The name of the project was changed successfully')
         }
       }
     });
   },
   'click .setProjectInactive': function(e, tmpl) {
     Session.set('projectId', null);
     Notifications.warn('Project is now inactive', '');
     Projects.update(this._id, {$set: {status: "inactive"}});
   }
});