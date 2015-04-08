Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router._filters = {
  resetScroll: function () {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
  }
};

var filters = Router._filters;

if(Meteor.isClient) {
  Router.onAfterAction(filters.resetScroll); // for all pages
}

var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render this template
   this.render('landingPage'); 
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
// Before any routing run the requireLogin function. 
// Except in the case of "landingPage". 
Router.onBeforeAction(requireLogin, {except: ['landingPage']});

Router.route('/', { 
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('boards');
  }
});
Router.route('/boards', { 
  name: 'boards',
  waitOn: function() {
    return [Meteor.subscribe('boards')];
  }
});

Router.route('/archives', { 
  name: 'archives',
  waitOn: function() {
    return [
      Meteor.subscribe('boards'),
      Meteor.subscribe('projects')
    ];
  }
});

Router.route('/boards/:_id', {
  name: 'boardPage',
  waitOn: function() {
    return [
      Meteor.subscribe('projects'),
      Meteor.subscribe('views'),
      Meteor.subscribe('goals')
    ];
  },
  onAfterAction: function () {
    Session.set('boardId', this.params._id);
  },
  data: function() { return Boards.findOne(this.params._id); }
});