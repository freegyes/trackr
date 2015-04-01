Template.goals.created = function() {
  Session.set('view', 'week');
  Session.set('currentDate', new Date());
  dateSetter(Session.get('currentDate'));
  Session.set('projectId', null);
}

Template.goals.rendered = function() {
  $(window).resize(function() {
     Session.set('windowHeight', window.innerHeight);
   });

  var setHeight = Tracker.autorun(function() {
    $('.table-content').height(function(index, height) {
        return Session.get('windowHeight') - $(this).offset().top;
    });
  });

  var init = Tracker.autorun(function() {
    Session.get('boardId');
    // wait for the dom to render
    setTimeout(function() {
      $('input').tooltip();
      $('h3').tooltip();  
    }, 500);
  });
  // make a child project active on each board change event
  // var changeRoutes = Tracker.autorun(function() {
  //   if (Projects.find({status: 'active', board: Session.get('boardId')}).count() === 0) {
  //     Session.set('projectId', null);
  //   } else {  
  //     Session.set('projectId', Projects.findOne({status: 'active', board: Session.get('boardId')})._id);
  //   }
  // });
}

Template.goals.helpers({
  projects: function(status) { 

    var selector = {
      status: status,
      board: Session.get('boardId')
    };   
    
    if (Session.get('projectId')) {
      selector._id = Session.get('projectId');
    };
    
    if (Projects.find(selector).count() === 0) {
      return false;
    } else {
      return Projects.find(selector);
    };
    
  },
  goals: function(mod, projectId) {
    var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod));
    var selector = {
      view: Session.get('view'),
      year: dateFormatter(date, 'YYYY'),
      project: projectId
    };
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
  modifiedDate: function(mod) {
    return dateViewFormatter(dateModifier(Session.get('currentDate'), Session.get('view'), parseInt(mod)));
  },
  viewBase: function() {
    return Session.get('view').toUpperCase();
  },
  modifiers: function() {
    var modrange = [-1,0,1];
    return modrange;
  }
});

Template.goals.events({
  'keyup .goal-name': function(e) {
    if (e.which == 13 && $(e.target).val()) {
      var date = dateModifier(Session.get('currentDate'), Session.get('view'), parseInt($(e.target).data('mod')));
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
          Notifications.success('Goal added', goalAttributes.name + ' has been successfully added.');       
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
        if (error) Notifications.error('Something is not right.', error.reason);
        Notifications.success('Project added', projectAttributes.name + ' has been successfully added.');
        // set project active in the session
        // Session.set('projectId', result._id);
        // set session null
        Session.set('projectId', null);
        // reset input 
        $('.project-name').val('');

      });   
    }
  }
})