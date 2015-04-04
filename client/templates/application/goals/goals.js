Template.goals.created = function() {
  // set the default view
  Session.set('view', 'week');

  // set sort object for the collection
  Session.set('sort', {submitted: 1});
  
  // reset the date and store as integers in the session
  Session.set('currentDate', new Date());  
}

Template.goals.rendered = function() {

  // runs each time a used variable changes
  var init = Tracker.autorun(function() {
    
    var view = Session.get('view');
    var date = Session.get('currentDate');
    var count = Session.get('goalsCount');
    
    // wait for the dom to render 
    setTimeout(function() {

      // tooltips were behaving unpredictable
      // $('input').tooltip({container: 'body'});

      // init inline editing
      // by first destroying any instances
      $('.editable').editable("destroy").editable({
        unsavedclass: null,
        mode: 'inline',
        showbuttons: false,
        success: function(response, newValue) {
          // get the primary key and the collection
          var id = $(this).data('pk');
          var collection = $(this).data('collection');
          // if it is empty --> delete
          if (collection == 'Projects') {
            if (!newValue) {
              Meteor.call('deleteProject', id, function(error, result) {
                // show notifications
                if (error) {
                    Notifications.error('Something is not right.', error.reason);
                  } else {
                    Notifications.warn('Project removed', 'Project <strong>' + name + "</strong> and its goals were removed.");    
                  }
                });
            } else {
              // if not, update name
              Projects.update(id, {$set: {name: newValue}});     
            }  
          } else {
            if (!newValue) {
              Goals.remove(id);
            } else {
              // if not, update name
              Goals.update(id, {$set: {name: newValue}});     
            }  
          }
        }
      });
    }, 500);
  });
}

Template.goals.helpers({
  headers: function() {
    // take a date
    var date = Session.get('currentDate');
    // get the current view
    var view = Session.get('view');
    // get view order
    var viewOrder = [];
    var viewOrderObject = Views.find({}, {order: 1}).fetch();
    for (var i in viewOrderObject) {
      viewOrder.push(viewOrderObject[i].timeFrame);
    }
    // get index of current view
    var viewIndex = viewOrder.indexOf(view);

    var headers = [];

    // if this is the widest context
    if (viewIndex + 2 > viewOrder.length) {
      // dont include the nonexistent wider goals
      // build only widest context headers
      for (var i = -1; i < 4; i++) {
        var actualView = buildHeader(date, view, i, 0, viewOrder, viewIndex, actualView);
        headers.push(actualView);
      };
    } else {    
        // build bigger context base view
        var widerViewBase = buildHeader(date, view, 0, 1, viewOrder, viewIndex, widerViewBase);
        // push to container array
        headers.push(widerViewBase);

        // build bigger context future view
        var widerViewFuture = buildHeader(date, view, 1, 1, viewOrder, viewIndex, widerViewFuture);
        // set pushed flag false
        var futurePushed = false;

        // build the three current view headers
        for (var i = -1; i < 2; i++) {
          
          var actualView = buildHeader(date, view, i, 0, viewOrder, viewIndex, actualView);

          // if wider context future starts in view, push it first
          if (!(futurePushed) && widerViewFuture.startDate <= actualView.startDate) {
            headers.push(widerViewFuture);
            headers.push(actualView);
            futurePushed = true;
          } else {
            headers.push(actualView);
          };

        };

        // if wider context future hasn't been pushed, push it now
        if (!(futurePushed)) {
          headers.push(widerViewFuture);  
        }
    }
    return headers;
  },
  // override global sorter object
  sort: function() {
    return Session.get('sort');
  },
  // extend global board and project helper selector object
  // with case insensitive regex expression built on the fly
  filterProjects: function() {
    return {$regex: Session.get('searchProjects'),$options:"i"}
  },
  // checks if a widerContext exists on page
  widerContext: function (view) {
    if( !(view === Session.get('view')) ) {
      return true;
    } else {
      return false;
    }
  },
  widerContextHeaderClass: function(view) {
    // if this is from a wider context than the actual
    // give it a class to style
    if( !(view === Session.get('view')) ) {
      return 'wider-goals';
    } else {
      return 'current-goals-header';
    }
  },
  widerContextBodyClass: function(view) {
    // if this is from a wider context than the actual
    // give it a class to style
    if( !(view === Session.get('view')) ) {
      return 'wider-goals';
    } else {
      return 'current-goals-body';
    }
  }
});

Template.goals.events({
  // add goal
  'keyup .goal-name': function(e) {
    var self = this;
    // if return is pressed and input is not empty
    if (e.which == 13 && $(e.target).val()) {
            
      // build goal attributes to save
      var goalAttributes = {
        name: $(e.target).val(),
        view: self.view,
        year: self.year,
        quarter: self.quarter,
        month: self.month,
        week: self.week,
        project: $(e.target).data('project'),
        board: $(e.target).data('board')
      };

      Meteor.call('goalInsert', goalAttributes, function(error, result) {
        // show notifications
        if (error) {
          Notifications.error('Something is not right.', error.reason);
        } else {
          // Notifications.success('Goal added', '<strong>' + goalAttributes.name + '</strong> has been successfully added.');       
        }

        // reset input 
        $('.goal-name').val('');

      });   
    }
  },
  // add project
  'keyup .project-name': function(e, tmpl) {
    // if enter is pressed then add project to db
    if (e.which == 13 && $('.project-name').val()) {
      var projectAttributes = {
        name: $('.project-name').val(),
        board: Session.get('boardId')
      };

      Meteor.call('projectInsert', projectAttributes, function(error, result) {
        // show notifications
        if (error) {
          Notifications.error('Something is not right.', error.reason);
        } else {
          Notifications.success('Project added', '<strong>' + projectAttributes.name + ' has been successfully added.');
        } 
        
        // reset input 
        $('.project-name').val('');

      });   
    }
// this will be for filtering and sorting
//  },
//  'keyup .project-name-search': function(e, tmpl) {
//    Session.set('searchProjects', $('.project-name-search').val())
//  },
//  'click .sort-date-asc': function() {
//    Session.set('sort', {submitted: 1});
//  },
//  'click .sort-date-desc': function() {
//    Session.set('sort', {submitted: -1});
  },
  // on hover (mouseenter and mouseleave)
  // show and hide PROJECT settings dropdown button
  'mouseenter .project-column': function() {
    $('#btn-' + this._id).fadeIn(250);
  },
  'mouseleave .project-column': function() {
    $('#btn-' + this._id).fadeOut(250)
  },
  // on hover (mouseenter and mouseleave)
  // show and hide GOAL settings dropdown button
  'mouseenter tr': function() {
    $('#btn-' + this._id).fadeIn(250);
  },
  'mouseleave tr': function() {
    $('#btn-' + this._id).fadeOut(250)
  }
})