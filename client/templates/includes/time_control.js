Template.timeControl.helpers({
  now: function() {
    return displayCurrentDate(Session.get('currentDate'));
  }
})

Template.timeControl.events({
  'click .step-backwards': function() {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), -1).toDate();
    Session.set('currentDate', date);
  },
  'click .step-forwards': function() {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), 1).toDate();
    Session.set('currentDate', date);
  },
  'click .reset-date': function() {
    Session.set('currentDate', new Date());
    Notifications.success('Date reset to present', "Current date is: " + displayCurrentDate(Session.get("currentDate")));
  }
})