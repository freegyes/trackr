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

Template.projectItem.events({
  'click .list-group-item': function(e, tmpl) {
    Session.set('projectId', this._id);
    //iterate through all active projects and remove active state
    $('.list-group-item').removeClass('active');
    // add active state to the clicked one
    $('#' + this._id).addClass('active');    
  },
  'click .delete': function() {
    if (confirm("Are you sure you want to do this?")) {
      Projects.remove(this._id);
      Notifications.warn('Project removed', 'Project\'s expired and gone to meet its maker.');
      Session.set('projectId', null);
    }
  }
});