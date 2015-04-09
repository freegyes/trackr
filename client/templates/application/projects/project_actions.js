Template.projectActions.events({
  'click .setResponsible': function(e, tmpl) {
    var self = this;
    var board = self.board;
    var ownerId = Boards.findOne({_id: board}).owner;
    var hasAccess = Boards.findOne({_id: board}).hasAccess;
    Meteor.call('getUserEmail', ownerId, function (error, result) {
      var ownerEmail = result;
      hasAccess.push(ownerEmail);  
      var modalBody = "";

      if (!(self.responsible)) {
        var modalBody = "<p>Currently nobody is responsible for this project.";
      } else {
        var modalBody = "<p>Currently <strong>" + self.responsible + "</strong> is responsible for this project.";
      }

        // list anyone who has access
        if (hasAccess.length > 0) {
         modalBody += "<div class=\"form-group\"><label for=\"email\">Choose from this list: </label><select class=\"form-control set-responsibility\">"
          for (var i = 0; i < hasAccess.length; i++) {
            modalBody += "<option>" + hasAccess[i] + "</option>";
          };
          modalBody += "</select></div>";
        } else {
         modalBody += "<p>This board is NOT currently shared with anyone</p>"
        }

        bootbox.dialog({
         title: "Set responsibility for: " + self.name,
         message: modalBody,
         onEscape: function() {
           // action on close or hitting escape
         },
         buttons: {
           cancel: {
             label: "Cancel",
             className: "btn-warning",
             callback: function() {
               // action on closing the dialog with button
             }
           },
           success: {
            label: "Set",
            className: "btn-success",
            callback: function () {
              var email = $('.set-responsibility').val();
                var operationObject = {$set: {responsible: email}};
                Meteor.call('setResponsibility', self._id, operationObject, function (error, result) {
                  if (error) {
                    Notifications.error(error.reason, error.details);
                  } else {
                    Notifications.success('Responsible person added', 'Currently <strong>' + email + '</strong> is responsible for this project.');    
                  }
                });            
            }
          }
        }
        });
      
    });
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