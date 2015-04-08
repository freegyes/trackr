Meteor.publish('views', function() {
  return Views.find({});
});

Meteor.publish('boards', function() {
  var email = Meteor.users.findOne(this.userId).emails[0].address;
  return Boards.find({ $or: [{owner: this.userId}, {hasAccess: email} ] });
});

Meteor.publish('projects', function() {
  return Projects.find({});
});

Meteor.publish('goals', function() {
  return Goals.find({});
});