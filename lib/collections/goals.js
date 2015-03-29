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
      quarter: Number,
      month: Number,
      week: Number,
      project: String,
      board: String,
      view: String
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
  },
  deleteGoals: function(selector) {
    check(selector, String);
    Goals.remove({project: selector});
    return true;
  }
});