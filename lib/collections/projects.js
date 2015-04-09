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
    var user = Meteor.user();
    var project = _.extend(projectAttributes, {
      submitted: new Date(),
      status: "active",
      creator: user._id,
      responsible: null
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
  },
  setResponsibility: function(id, operation) {
    check(id, String);
    check(operation, Object);
    Projects.update(id, operation);
    return true;
  }
});