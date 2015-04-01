Template.projectItem.helpers({
  // add active state class to active project
  // state: function() {
  //   if (Session.equals('projectId', this._id)) {
  //     return "active";
  //   };
  // }
})

Template.projectItem.events({
  // set the clicked project active
  // 'click .list-group-item': function(e, tmpl) {
  //   Session.set('projectId', this._id);
  // },
})