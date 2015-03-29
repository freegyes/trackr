Template.boardPage.created = function() {
  //hotfix for reloads
  //Session.set('boardId', document.URL.slice(-17));
}

Template.boardPage.rendered = function() {
  // Drug Panel
      var panel = $('#project-panel');
      var opener = $('#opener');

      // Build nudge function with default parameters
      jQuery.fn.nudge = function(param){
      param = jQuery.extend({},{ amount:10, speed:300 },param);

      jQuery(this).hover(function() { //mouse in
        jQuery(this).animate({ marginRight: '-='+param.amount }, param.speed);
        }, function() { //mouse out
        jQuery(this).animate({ marginRight: '+='+param.amount }, param.speed);
        });
      };

      // Call nudge on panel
      opener.nudge();

      // Set onClick listener
      opener.on('click', function() {
        // if manage projects link clicked   
          
          // On close slide out and toggle class
          if (panel.hasClass("visible")) {
            panel.removeClass('visible').animate({'margin-left':'-320px'});
            opener.children().removeClass('fa-times').addClass('fa-bars').text(' Projects');
          // On open slide in and toggle class
          } else {
            panel.addClass('visible').animate({'margin-left':'0px'});
            opener.children().removeClass('fa-bars').addClass('fa-times').text(' Close panel');
          } 
          return false; 
        
      });
}

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

Template.boardPage.events({
  'click .reset-filters': function() {
    Session.set('projectId', null);
  }
})