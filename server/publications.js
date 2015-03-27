Meteor.publish('projects', function() {
  return Projects.find({});
});

Meteor.publish('goals', function() {
  return Goals.find({});
});

Meteor.publish('views', function() {
  return Views.find({});
});