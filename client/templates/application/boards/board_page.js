Template.boardPage.helpers({
  projectsCount: function() {
    return Projects.find({board: this._id, status: "active"}).count();
  }
})