Template.boardPage.helpers({
  name: function() {
    return Boards.findOne({_id: Session.get('boardId')}).name;
  },
  projectsCount: function() {
    return Projects.find({board: this._id}).count();
  },
  goalsCount: function() {
    return Goals.find({board: this._id}).count();
  }
})