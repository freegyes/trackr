Template.viewControl.helpers({
  views: function() {
    return Views.find();
  },
  viewClass: function() {
    if (Session.equals('view', this.timeFrame)) {
      return "active";  
    };
  }
})

Template.viewControl.events({
  'click .time-frame': function() {
    Session.set('view', this.timeFrame);
  }
})