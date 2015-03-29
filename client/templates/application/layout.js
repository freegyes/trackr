Template.layout.created = function() {
  Meteor.subscribe('boards');
  Meteor.subscribe('projects');
  Meteor.subscribe('goals');
  Meteor.subscribe('views');
}