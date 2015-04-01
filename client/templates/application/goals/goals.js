Template.goals.created = function() {
  // set the default view
  Session.set('view', 'week');

  // set sort object for the collection
  Session.set('sort', {submitted: 1});
  
  // reset the date and store as integers in the session
  Session.set('currentDate', new Date());
  dateSetter(Session.get('currentDate'));
  
  // reset project filtering
  Session.set('projectId', null);
}

Template.goals.rendered = function() {
  // table height can be reset on resize
  // this is a memory hog, be aware
  //
  //  $(window).resize(function() {
  //     Session.set('windowHeight', window.innerHeight);
  //   });

  // set table height on render 
  setHeight('.table-content');

  // init tooltips
  // set container to avoid jumping
  $('input').tooltip({container: 'body'});
  $('th').tooltip({container: 'body'});  
}

Template.goals.helpers({
  // bulid a selector that retrieves the Goals 
  // for the view and the project
  goals: function(mod, projectId) {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod));
    
    var selector = {
      view: Session.get('view'),
      year: dateFormatter(date, 'YYYY'),
      project: projectId
    };
    
    // extend the selector based on the view
    switch (Session.get('view')) {
      case 'week':
        selector.week = dateViewFormatter(date);
        break;
      case 'month':
        selector.month = dateViewFormatter(date);
        break;
      case 'quarter':
        selector.quarter = dateViewFormatter(date);
        break;
      case 'year':
        selector.year = dateViewFormatter(date);
        break;
      default:
        break;
    };
    return Goals.find(selector);
  },
  // format the dates based on the view 
  // to display in the tooltips
  goalsRange: function(mod) {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod));
    switch (Session.get('view')) {
      case 'week':
        return date.format('[week: ] YYYY. w.');
        break;
      case 'month':
        return date.format('YYYY. MM.');
        break;
      case 'quarter':
        return date.format('[quarter: ] YYYY. Q.');
        break;
      case 'year':
        return date.format('YYYY.');
        break;
      default:
        break;
    };
  },
  // dinamically change contextual state of goals
  // by updating their class
  addStateClass: function() {
    switch (this.status) {
      case "reached":
        return "list-group-item-success";
      case "partially-reached":
        return "list-group-item-warning";
      case "not-reached":
        return "list-group-item-danger";
      case "default":
        return "list-group-item-"; 
      default:
        return "list-group-item-";  
    }
  },
  // adjust the date based on the view
  // modify by parameter
  modifiedDate: function(mod) {
    return dateViewFormatter(dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod)));
  },
  // display the view
  viewBase: function() {
    return toTitleCase(Session.get('view'));
  },
  // set up an array to iterate on
  // 0 --> current view
  // 1 --> current +1 view
  modifiers: function() {
    var modrange = [-1,0,1];
    return modrange;
  },
  // override global sorter object
  sort: function() {
    return Session.get('sort');
  },
  // extend global board and project helper selector object
  // with case insensitive regex expression built on the fly
  filterProjects: function() {
    return {$regex: Session.get('searchProjects'),$options:"i"}
  }
});

Template.goals.events({
  'keyup .goal-name': function(e) {
    // if return is pressed and input is not empty
    if (e.which == 13 && $(e.target).val()) {
      // calculate adjusted date
      var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt($(e.target).data('mod')));
      // build goal attributes to save
      var goalAttributes = {
        name: $(e.target).val(),
        view: Session.get('view'),
        year: dateFormatter(date, 'YYYY'),
        quarter: dateFormatter(date, 'Q'),
        month: dateFormatter(date, 'M'),
        week: dateFormatter(date, 'w'),
        project: $(e.target).data('project'),
        board: Session.get('boardId')
      };

      Meteor.call('goalInsert', goalAttributes, function(error, result) {
        // show notifications
        if (error) {
          Notifications.error('Something is not right.', error.reason);
        } else {
          Notifications.success('Goal added', '<strong>' + goalAttributes.name + '</strong> has been successfully added.');       
        }

        // reset input 
        $('.goal-name').val('');

      });   
    }
  },
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
//  },
//  'keyup .project-name-search': function(e, tmpl) {
//    Session.set('searchProjects', $('.project-name-search').val())
//  },
//  'click .sort-date-asc': function() {
//    Session.set('sort', {submitted: 1});
//  },
//  'click .sort-date-desc': function() {
//    Session.set('sort', {submitted: -1});
  }
})