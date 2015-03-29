Template.projectsList.created = function() {
  Meteor.subscribe('projects');
}

Template.projectsList.helpers({
  projects: function(status) {     
    if (Projects.find({status: status}).count() === 0) {
      return false;
    } else {
      return Projects.find({status: status});
    }
  }
});

Template.projectsList.events({
  'keyup .project-name': function(e, tmpl) {
    // if enter is pressed then add project to db
    if (e.which == 13 && $('.project-name').val()) {
      var projectAttributes = {
        name: $('.project-name').val()
      };

      Meteor.call('projectInsert', projectAttributes, function(error, result) {
        // show notifications
        if (error) Notifications.error('Something is not right.', error.reason);
        Notifications.success('Project added', projectAttributes.name + ' has been successfully added.');
        // set project active in the session
        Session.set('projectId', result._id);
        // reset input 
        $('.project-name').val('');

      });   
    }
  }
});

Template.datepicker.rendered = function() {
  $('#datepicker').datepicker({
      todayBtn: true,
      calendarWeeks: true,
      todayHighlight: true,
  });
}

Template.datepicker.events({
  'click .set-date': function() {
    var date = moment($("#datepicker").datepicker('getFormattedDate'), "MM-DD-YYYY").toDate();
    dateSetter(date);
    Session.set('currentDate', date);
    Notifications.success('Timetravel successful', "Current date is: " + displayCurrentDate(date));
  }
})

Template.datepicker.helpers({
  now: function() {
    return displayCurrentDate(Session.get('currentDate'));
  }
})

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
        Notifications.warn('Project and its goals were removed', 'Project\'s expired and gone to meet its maker.');
        Session.set('projectId', null);
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

Template.inactiveProjectItem.events({
  'click .setProjectActive': function(e, tmpl) {
    Session.set('projectId', this._id);
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
        Notifications.warn('Project and its goals were removed', 'Project\'s expired and gone to meet its maker.');
        Session.set('projectId', null);
      }
     });
   }
})
