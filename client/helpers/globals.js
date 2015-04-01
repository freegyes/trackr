// boards
// global helper for retrieving boards
Template.registerHelper('boards',function(selector){
  var sort = selector.hash.sort;
  delete selector.hash.sort;
  if (Boards.find(selector.hash).count() === 0) {
    return false;
  } else {
    return Boards.find(selector.hash, {sort: sort});
  }
});

// projects
// global helper for retrieving projects
Template.registerHelper('projects',function(selector){
  var sort = selector.hash.sort;
  delete selector.hash.sort;
  if (Projects.find(selector.hash).count() === 0) {
    return false;
  } else {
    return Projects.find(selector.hash, {sort: sort});
  }
});

// sort
// global helper for newest first order
Template.registerHelper('sort',function(){
  return {submitted: -1}
});

//boardName
// global helper for retrieving a board's name by id
Template.registerHelper('boardName', function(boardId){
  return Boards.findOne({_id: boardId}).name;
})