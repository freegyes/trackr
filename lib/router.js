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


// // Show login screen unless signed in
// Router.onBeforeAction(function(pause) {
//   if (! Meteor.userId()) {
//     this.setLayout(null);
//     this.render('landingPage');
//     pause();
//   } else {
//     this.setLayout(this.lookupLayoutTemplate());
//     this.next();
//   }
// });

// var requireLogin = function() {
//   if (! Meteor.user()) {
//     if (Meteor.loggingIn()) {
//       this.render(this.loadingTemplate);
//     } else {
//       this.render('landingPage');
//     }
//   } else {
//     this.next();
//   }
// }
// // Before any routing run the requireLogin function. 
// // Except in the case of "landingPage". 
// Router.onBeforeAction(requireLogin, {except: ['landingPage']});

Router.route('/', {name: 'home'});

Router.route('/boards', { 
  name: 'boards',
  waitOn: function() {
    return Meteor.subscribe('boards');
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

Router.route('/dump', { 
  name: 'dump',
  waitOn: function() {
    return [
      Meteor.subscribe('boards'),
      Meteor.subscribe('projects'),
      Meteor.subscribe('views'),
      Meteor.subscribe('goals')
    ];
  }
});