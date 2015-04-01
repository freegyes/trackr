Template.archives.rendered = function() {
  Session.setDefault('searchBoards', '');
  Session.setDefault('searchProjects', '');
};

Template.archives.helpers({
  boards: function(status) {
    if (Boards.find({status: status, name: {$regex: Session.get('searchBoards'),$options:"i"}}).count() === 0) {
      return false;
    } else {
      return Boards.find({status: status, name: {$regex: Session.get('searchBoards'),$options:"i"}});
    }
  },
  projects: function(status) { 
    if (Projects.find({status: status, name: {$regex: Session.get('searchProjects'),$options:"i"}}).count() === 0) {
      return false;
    } else {
      return Projects.find({status: status, name: {$regex: Session.get('searchProjects'),$options:"i"}});
    }
  }
})

Template.archives.events({
  'keyup .board-name-search': function(e, tmpl) {
    Session.set('searchBoards', $('.board-name-search').val())
  },
  'keyup .project-name-search': function(e, tmpl) {
    Session.set('searchProjects', $('.project-name-search').val())
  }
});