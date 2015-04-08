Template.boardActions.events({
  'click .shareBoard': function(e, tmpl) {
     var self = this;
     var hasAccess = self.hasAccess;
     var modalBody = "<p>The board owner is: <strong>" + Meteor.user().emails[0].address + "</strong></p>";

     // list anyone who has access
     if (hasAccess.length > 0) {
      modalBody += "<p>This board is shared with: <ul>"
      for (var i = 0; i < hasAccess.length; i++) {
       modalBody += "<li>" + hasAccess[i] + "</li>";
     };
      modalBody += "</ul></p>";
     } else {
      modalBody += "<p>This board is NOT currently shared.</p>"
     }

     // add input for new email
     modalBody += "<div class=\"form-group\"><label for=\"email\">Enter an email address to share this board with:</label><input type=\"text\" class=\"share-with-email form-control\" id=\"email\" placeholder=\"email@address.com\"></div>";

     bootbox.dialog({
      title: "Share board: " + self.name,
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
          label: "Share",
          className: "btn-success",
          callback: function () {
            var email = $('.share-with-email').val();
            if (email == Meteor.user().emails[0].address || hasAccess.indexOf(email) > -1) {
              Notifications.success('This board is already shared', 'This user already has access to this board.');
            } else {
              Meteor.call('checkUserByEmail', email, function (error, result) {
               if (result) {
                Boards.update(self._id, {$push: {hasAccess: email}});
                Notifications.success('The board has been shared', 'You have successfully shared your board with: ' + email);
               } else {
                Notifications.error('No user found: ' + email, 'Can only share a board with an already registered user');
               }
              });  
            }
          }
        }
      }
     });


     //Notifications.warn('Board is now inactive', 'The board: <strong>' + Boards.findOne({_id: id}).name + '</strong> can be managed in the <a href=\"\/archives\">Archives<\/a>.');
     //Boards.update(id, {$set: {hasAccess: "inactive"}});
   },
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
