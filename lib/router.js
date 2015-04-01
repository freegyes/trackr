Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function() { 
  // return [Meteor.subscribe('XXX')]
  // }
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

Router.route('/', { name: 'home'});
Router.route('/boards', { name: 'boards'});
Router.route('/archives', { name: 'archives'});

Router.route('/boards/:_id', {
  name: 'boardPage',
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('singlePost', this.params._id),
  //     Meteor.subscribe('comments', this.params._id)
  //   ];
  // },
  data: function() { return Boards.findOne(this.params._id); }
});