Template.projectsList.helpers({
  projects: function(status) { 

    var selector = {
      status: status,
      board: Session.get('boardId')
    }    
    if (Projects.find(selector).count() === 0) {
      return false;
    } else {
      return Projects.find(selector);
    }
  }
});

Template.projectsList.events({
  'keyup .project-name': function(e, tmpl) {
    // if enter is pressed then add project to db
    if (e.which == 13 && $('.project-name').val()) {
      var projectAttributes = {
        name: $('.project-name').val(),
        board: Session.get('boardId')
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