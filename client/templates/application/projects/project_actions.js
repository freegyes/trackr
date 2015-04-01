Template.projectActions.events({
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
   },
   'click .setProjectName': function(e, tmpl) {
     var id = this._id;
     bootbox.prompt({
       title: "Edit the name of your project:",
       value: Projects.findOne({_id: id}).name,
       callback: function(result) {
         if (result === null) {
           return
         } else {
           Projects.update(id, {$set: {name: result}});     
           Notifications.success('Changed name', 'The name of the project was changed successfully.')
         }
       }
     });
   },
   'click .setProjectInactive': function(e, tmpl) {
     var id = this._id;
    Notifications.warn('Project is now inactive', 'The project: <strong>' + Projects.findOne({_id: id}).name + '</strong> can be managed in the <a href=\"\/archives\">Archives<\/a>.');
    Projects.update(id, {$set: {status: "inactive"}});
   }
});