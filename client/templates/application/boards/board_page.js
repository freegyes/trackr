Template.boardPage.helpers({
  projectsCount: function() {
    return Projects.find({board: this._id, status: "active"}).count();
  }
})

Template.boardPage.events({
  'click .send-email': function() {
    bootbox.prompt({
      title: "Send a summary email to this address:",
      callback: function(result) {
        if (result === null) {
          return
        } else {
          var dataContext = {
            projects: Projects.find(),
            url:"http://trackr.meteor.com",
            title:"Check out your goals on the site!"
          };
          var emailBody = Blaze.toHTMLWithData(Template.emailGoals,dataContext);
          Meteor.call('sendEmail',
                      result,
                      'trackr@tryfruit.com',
                      '[Fruit TrackR] - Your goals for this week',
                      emailBody);
          Notifications.success('Email sent', '')
        }
      }
    });
  }
})