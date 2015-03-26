Projects = new Mongo.Collection('projects');

Projects.allow({
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(projectAttributes, {
      name: String
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
  }
});

Goals = new Mongo.Collection('goals');


Goals.allow({
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
  goalInsert: function(goalAttributes) {
    check(goalAttributes, {
      name: String,
      year: Number,
      week: Number,
      project: String
    });
    // var user = Meteor.user();
    var goal = _.extend(goalAttributes, {
      //userId: user._id,
      submitted: new Date(),
      status: "default",
      owner: null
    });

    var goalId = Goals.insert(goal);

    return {
      _id: goalId
    };
  }
});