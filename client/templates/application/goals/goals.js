Template.goals.created = function() {
  Meteor.subscribe('goals');
  Meteor.subscribe('views');
  Session.set('view', 'week');
  Session.set('currentDate', new Date());
  dateSetter(Session.get('currentDate'));
}

Template.goals.rendered = function() {
  var init = Tracker.autorun(function() {
    Session.get('projectId');
      // wait for the dom to render
      setTimeout(function() {
        $('input').tooltip();
        $('h3').tooltip();  
      }, 500);
  });
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
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod));
    var selector = {
      view: Session.get('view'),
      year: dateFormatter(date, 'YYYY'),
      project: Session.get('projectId')
    };
    switch (Session.get('view')) {
      case 'week':
        selector.week = dateViewFormatter(date);
        break;
      case 'month':
        selector.month = dateViewFormatter(date);
        break;
      case 'quarter':
        selector.quarter = dateViewFormatter(date);
        break;
      case 'year':
        selector.year = dateViewFormatter(date);
        break;
      default:
        break;
    };
    return Goals.find(selector);
  },
  goalsRange: function(mod) {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod));
    switch (Session.get('view')) {
      case 'week':
        return date.format('[week: ] YYYY. w.');
        break;
      case 'month':
        return date.format('YYYY. MM.');
        break;
      case 'quarter':
        return date.format('[quarter: ] YYYY. Q.');
        break;
      case 'year':
        return date.format('YYYY.');
        break;
      default:
        break;
    };
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
  modifiedDate: function(mod) {
    return dateViewFormatter(dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod)));
  },
  year: function(mod) {
    return parseInt(Session.get('currentYear'))+parseInt(mod);
  },
  week: function(mod) {
    return parseInt(Session.get('currentWeek'))+parseInt(mod);
  },
  views: function() {
    return Views.find();
  },
  viewClass: function() {
    if (Session.equals('view', this.timeFrame)) {
      return "active";  
    };
  },
  viewBase: function() {
    return Session.get('view').toUpperCase();
  }
});

Template.goals.events({
  'keyup .goal-name': function(e) {
    if (e.which == 13 && $(e.target).val()) {
      var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt($(e.target).data('mod')));
      var goalAttributes = {
        name: $(e.target).val(),
        view: Session.get('view'),
        year: dateFormatter(date, 'YYYY'),
        quarter: dateFormatter(date, 'Q'),
        month: dateFormatter(date, 'M'),
        week: dateFormatter(date, 'w'),
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
  'click .deleteGoal': function() {
    Goals.remove(this._id);
    Notifications.warn('Goal removed', 'Goal\'s expired and gone to meet its maker.');
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
  },
  'click .time-frame': function() {
    Session.set('view', this.timeFrame);
  }
})