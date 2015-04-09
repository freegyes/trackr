Template.goalActions.events({
  'click .deleteGoal': function() {
    Notifications.warn('Goal removed', '<strong>' + this.name + '</strong');
    Goals.remove(this._id);
  },
  'click .setGoalName': function(e, tmpl) {
    var id = this._id;
      bootbox.prompt({
        title: "Edit the name of your goal:",
        value: Goals.findOne({_id: id}).name,
        callback: function(result) {
          if (result === null) {
            return
          } else {
            Goals.update(id, {$set: {name: result}});     
          }
        }
      });
  },
  'click .setStatusReached': function() {
    Goals.update(this._id, {$set: {status: "reached"}})
  },
  'click .setStatusPartiallyReached': function() {
    var id = this._id;
    // if the actual status is not set or reached then copy
    if (Goals.findOne({_id: id}).status == "default" || Goals.findOne({_id: id}).status == "reached") {
      copyGoal(id);
    }
    // update status
    Goals.update(id, {$set: {status: "partially-reached"}});
  },
  'click .setStatusNotReached': function() {
    var id = this._id;
    // if the actual status is not set or reached then copy
    if (Goals.findOne({_id: id}).status == "default" || Goals.findOne({_id: id}).status == "reached") {
      copyGoal(id);
    }
    // update status
    Goals.update(id, {$set: {status: "not-reached"}});
  },
  'click .setStatusDefault': function() {
    Goals.update(this._id, {$set: {status: "default"}})
  }
})

// copies a goal to the newxt range of the context
copyGoal = function(goalId) {
  // get goal details
  var goal = Goals.findOne({_id: goalId});
  var view = goal.view;
  var year = goal.year;
  var quarter = goal.quarter;
  var month = goal.month;
  var week = goal.week;
  var project = goal.project;
  var board = goal.board
  // parse date from vars
  var date = moment(String(year) + '-' + String(week), "YYYY-w");
  // get view order
  var viewOrder = [];
  var viewOrderObject = Views.find({}, {order: 1}).fetch();
  for (var i in viewOrderObject) {
    viewOrder.push(viewOrderObject[i].timeFrame);
  }
  // get index of current view
  var viewIndex = viewOrder.indexOf(view);

  // build NEXT
  var nextGoalObject = buildHeader(date, view, 1, 0, viewOrder, viewIndex, nextGoalObject);

  // show modal to copy with new name
  bootbox.prompt({
    title: "Don't worry, we can copy that for you to the next " + nextGoalObject.view + ".",
    value: Goals.findOne({_id: goalId}).name,
    buttons: {
        "cancel": {
            label: 'Don\'t copy.',
            className: 'btn-default'
        },
        "confirm": {
            label: 'Sure, thanks!',
            className: 'btn-primary'
        }
    },
    callback: function(result) {
      if (result === null) {
        return
      } else {
        // build goal attributes to save
        var goalAttributes = {
          name: result,
          view: goal.view,
          year: nextGoalObject.year,
          quarter: nextGoalObject.quarter,
          month: nextGoalObject.month,
          week: nextGoalObject.week,
          project: goal.project,
          board: goal.board
        };

        Meteor.call('goalInsert', goalAttributes, function(error, result) {
          // show notifications
          if (error) {
            Notifications.error('Something is not right.', error.reason);
          } else {
            //Notifications.success('Goal added', '<strong>' + goalAttributes.name + '</strong> has been successfully added.');       
          }
        }); 
      }
    }
  });
};