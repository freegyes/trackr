Template.boards.rendered = function() {
  // init tooltips
  $('input').tooltip();
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