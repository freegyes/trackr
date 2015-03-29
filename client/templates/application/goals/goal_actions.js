Template.goalActions.events({
  'click .deleteGoal': function() {
    Goals.remove(this._id);
    Notifications.warn('Goal removed', '');
  },
  'click .setGoalName': function(e, tmpl) {
    // add goal id to session
    Session.set('editing-goal', this._id);
    bootbox.prompt({
      title: "Edit the name of your goal:",
      value: Goals.findOne({_id: Session.get('editing-goal')}).name,
      callback: function(result) {
        if (result === null) {
          Session.set('editing-goal', null);
        } else {
           Goals.update(Session.get('editing-goal'), {$set: {name: result}});     
           Notifications.success('Changed name', 'The name of the goal was changed successfully')
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