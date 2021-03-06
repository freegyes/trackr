Template.archives.helpers({
  // extend global board and project helper selector object
  // with case insensitive regex expression built on the fly
  filterBoards: function() {
    return {$regex: Session.get('searchBoards'),$options:"i"}
  },
  filterProjects: function() {
    return {$regex: Session.get('searchProjects'),$options:"i"}
  }
})

Template.archives.events({
  'keyup .board-name-search': function(e, tmpl) {
    Session.set('searchBoards', $('.board-name-search').val())
  },
  'keyup .project-name-search': function(e, tmpl) {
    Session.set('searchProjects', $('.project-name-search').val())
  },
  // on hover (mouseenter and mouseleave)
  // show and hide board settings dropdown button
  'mouseenter .panel': function() {
    $('#btn-' + this._id).fadeIn(250);
  },
  'mouseleave .panel': function() {
    $('#btn-' + this._id).fadeOut(250)
  },
})