Template.boards.helpers({
  boards: function(status) {
    if (Boards.find({status: status}).count() === 0) {
      return false;
    } else {
      return Boards.find({status: status});
    }
  }
})

Template.boards.events({
  'keyup .board-name': function(e, tmpl) {
    // if enter is pressed then add board to db
    if (e.which == 13 && $('.board-name').val()) {
      var boardAttributes = {
        name: $('.board-name').val()
      };

      Meteor.call('boardInsert', boardAttributes, function(error, result) {
        // show notifications
        if (error) Notifications.error('Something is not right.', error.reason);
        Notifications.success('Board added', boardAttributes.name + ' has been successfully added.');
        // set board active in the session
        Session.set('boardId', result._id);
        // reset input 
        $('.board-name').val('');

      });   
    }
  }
});