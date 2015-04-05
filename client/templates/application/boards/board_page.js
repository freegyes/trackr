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
          var emailBody = '<h4>Week 13</h4><ul><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li>/ul><h4>Week 14</h4><ul><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li><li>this is a goal</li>/ul><hr><img src=\"http://placehold.it/350x150\"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat ipsa officiis deserunt modi exercitationem velit fugit eos adipisci pariatur harum. Tenetur itaque mollitia odit porro!</p>';
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