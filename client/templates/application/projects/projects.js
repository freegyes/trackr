Template.projectsList.created = function() {
//   Session.setDefault('limit', 10);
//   Tracker.autorun(function() {
     Meteor.subscribe('projects');
//   });
}

// Template.booksList.rendered = function() {
//   // is triggered every time we scroll
//   $(window).scroll(function() {
//     if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
//       incrementLimit();
//     }
//   });
// }

Template.projectsList.helpers({
  projects: function() {     
//    var sort = Session.get("sort_by");
//    return Projects.find({}, {sort: sort, limit: Session.get('limit') });
    return Projects.find({});
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

//    e.preventDefault();
//
//    if (confirm("Biztos-biztos?")) {
//      var currentReferenceId = this._id;
//      Books.remove(currentReferenceId);
//      Notifications.warn('Kapitány, ó Kapitányom!', 'Törölve, ahogy kérted.');
});

// Template.projectItem.helpers({
//   editingProject: function() {
//     return Session.equals('editing-project', this._id);
//   }
// })

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
   }  
});
