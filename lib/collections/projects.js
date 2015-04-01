Projects = new Mongo.Collection('projects');

Projects.allow({
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(projectAttributes, {
      name: String,
      board: String
    });
    // var user = Meteor.user();
    var project = _.extend(projectAttributes, {
      //userId: user._id,
      submitted: new Date(),
      status: "active",
      owner: null
    });

    var projectId = Projects.insert(project);

    return {
      _id: projectId
    };
  },
  deleteProject: function(id) {
    check(id, String);
    Projects.remove(id);
    // remove all connected goals
      Goals.remove({project: id})
    return id;
  }
});