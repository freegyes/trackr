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
            Notifications.success('Changed name', 'The name of the goal was changed successfully.')
          }
        }
      });
  },
  'click .setStatusReached': function() {
    Goals.update(this._id, {$set: {status: "reached"}})
  },
  'click .setStatusPartiallyReached': function() {
    Goals.update(this._id, {$set: {status: "partially-reached"}})
  },
  'click .setStatusNotReached': function() {
    Goals.update(this._id, {$set: {status: "not-reached"}})
  },
  'click .setStatusDefault': function() {
    Goals.update(this._id, {$set: {status: "default"}})
  }
})