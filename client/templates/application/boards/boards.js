Template.boards.rendered = function() {
  // init tooltips
  $('input').tooltip();

  // runs each time a used variable changes
  var init = Tracker.autorun(function() {
    
    var boardsCount = Session.get('boardsCount');
    
    // wait for the dom to render 
    setTimeout(function() {

      // init inline editing
      // by first destroying any instances
      $('.editable').editable("destroy").editable({
        unsavedclass: null,
        mode: 'inline',
        onblur: 'submit',
        showbuttons: false,
        success: function(response, newValue) {
          // get the primary key
          var id = $(this).data('pk');
          // store original name
          var name = Boards.findOne({_id: id}).name;
          // if it is empty --> delete
          if (!newValue) {
            bootbox.confirm("Are you sure you want to delete the board: " + name + "?", function(result) {
              if (result) {
                Meteor.call('deleteBoard', id, function(error, result) {
                  // show notifications
                  if (error) {
                    Notifications.error(error.reason, error.details);
                  } else {
                    Notifications.warn('Board removed', 'Board <strong>' + name + "</strong> and its goals were removed.");    
                  }
                });  
              }
             });
          } else {
            // if not, update name
            var operation = {$set: {name: newValue}}
            Meteor.call('updateBoardName', id, operation, function (error, result) {
              if (error) {
                Notifications.error(error.reason, error.details);
              } else {
                Notifications.success('Changed name', 'The name of the board was changed successfully.');
              }
            });
          }
        }
      });
    }, 500);
  });
};

Template.boards.helpers({
  userEmail: function() {
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;  
    } else {
      return false;
    }
    
  },
  shared: function() {
    if (this.hasAccess.length > 0) {
      return true;
    } else {
      return false;
    }
  }
})

Template.boards.events({
  // add new boards from input via addInput
  'keyup .board-name': function(e){
    // if enter is pressed
    if (e.which == 13) {
      //call Meteor method 'boardInsert'
      addInput('.board-name', 'board', 'Insert');
      // set a session variable to be able to subscribe for changes
      Session.set('boardsCount', Boards.find().count())
    }
  },
  // on hover (mouseenter and mouseleave)
  // show and hide board settings dropdown button
  'mouseenter .panel': function() {
    $('#btn-' + this._id).fadeIn(250);
  },
  'mouseleave .panel': function() {
    $('#btn-' + this._id).fadeOut(250)
  },
  // on clicking the .board-route button
  // redirect to the specific board page
  'click .board-route': function() {
    Router.go('boardPage', {_id: this._id});
  }
});