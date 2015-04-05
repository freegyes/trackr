Template.goalsList.helpers({
  // bulid a selector that retrieves the Goals 
  // for the view and the project
  goals: function(projectId, view, year, quarter, month, week) {

    var selector = {
      view: view,
      year: parseInt(year),
      project: projectId
    };
    
    // extend the selector based on the view
    switch (view) {
      case 'week':
        selector.week = parseInt(week);
        break;
      case 'month':
        selector.month = parseInt(month);
        break;
      case 'quarter':
        selector.quarter = parseInt(quarter);
        break;
      case 'year':
        selector.year = parseInt(year);
        break;
      default:
        break;
    };

    // set auto sorting by status
    var sort = {
      sort: {
        "status": -1
      }
    }

    // set a session variable to be able to subscribe for changes
    Session.set('goalsCount', Goals.find(selector).count())
    
    return Goals.find(selector, sort);
  },
  // dynamically change contextual state of goals
  // by updating their class
  addStateClass: function() {
    switch (this.status) {
      case "reached":
        return "success";
      case "partially-reached":
        return "warning";
      case "not-reached":
        return "danger";
      case "default":
        return ""; 
      default:
        return "";  
    }
  },
  // checks if it is the wider context
  widerContext: function (view) {
    if( !(view === Session.get('view')) ) {
      return true;
    } else {
      return false;
    }
  }
})