Template.goals.created = function() {
  Meteor.subscribe('goals');
}

Template.goals.helpers({
  project: function() {
    if (Session.get('projectId') === null) {
      return false;
    } else {
      return Projects.find({_id: Session.get('projectId')});
    }
  },
  goals: function(mod) {
    var week = parseInt(Session.get('currentWeek')) + parseInt(mod);
    var year = parseInt(Session.get('currentYear'));
    return Goals.find({project: Session.get('projectId'), year: year, week: week});
  },
  addStateClass: function() {
    switch (this.status) {
      case "reached":
        return "list-group-item-success";
      case "partially-reached":
        return "list-group-item-warning";
      case "not-reached":
        return "list-group-item-danger";
      case "default":
        return "list-group-item-"; 
      default:
        return "list-group-item-";  
    }
  },
  year: function(mod) {
    return parseInt(Session.get('currentYear'))+parseInt(mod);
  },
  week: function(mod) {
    return parseInt(Session.get('currentWeek'))+parseInt(mod);
  }
});

Template.goals.events({
  'keyup .goal-name': function(e) {
    // if enter is pressed then add goal to db
    if (e.which == 13 && $(e.target).val()) {
      var goalAttributes = {
        name: $(e.target).val(),
        year: $(e.target).data('year'),
        week: $(e.target).data('week'),
        project: Session.get('projectId')
      };

      Meteor.call('goalInsert', goalAttributes, function(error, result) {
        // show notifications
        if (error) {
          Notifications.error('Something is not right.', error.reason);
        } else {
          Notifications.success('Goal added', goalAttributes.name + ' has been successfully added.');       
        }

        // reset input 
        $('.goal-name').val('');

      });   
    }
  },
  'click .delete': function() {
    if (confirm("Are you sure you want to do this?")) {
      Goals.remove(this._id);
      Notifications.warn('Goal removed', 'Goal\'s expired and gone to meet its maker.');
    }
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