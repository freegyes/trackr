// parse the date and populate the session variables with integers
dateSetter = function(date){
  Session.set('currentYear', parseInt(moment(date).format('YYYY')));
  Session.set('currentQuarter', parseInt(moment(date).format('Q')));
  Session.set('currentMonth', parseInt(moment(date).format('M')));
  Session.set('currentWeek', parseInt(moment(date).format('w')));
  Session.set('currentDay', parseInt(moment(date).format('D')));
}

// modify the date on the given scale by a given modifier
dateModifier = function(date, dimension, modifier) {
  dim = dimension + 's';
  if (modifier < 0) {
    modifier = Math.abs(modifier);
    return moment(date).subtract(modifier, dim);  
  } else {
    modifier = Math.abs(modifier);
    return moment(date).add(modifier, dim);
  };
}

// formats the date and returns an integer
dateFormatter = function(date, formatter) {
  return parseInt(date.format(formatter));
}

// formats the date and returns an integer based on the view
dateViewFormatter = function(date) {
  switch (Session.get('view')) {
    case 'week':
      var formatter = 'w';
      break;
    case 'month':
      var formatter = 'M';
      break;
    case 'quarter':
      var formatter = 'Q';
      break;
    case 'year':
      var formatter = 'YYYY';
      break;
    default:
      break;
  }
  return parseInt(date.format(formatter));
} 

// builds a string from the current date that can be displayed
displayCurrentDate = function(date) {
  return moment(date).format('YYYY. MM. DD.')
}

// addInput
// global function for adding input on enter from an input box
addInput = function(inputClass, collection, operation) {
  // if input is not empty
  if ($(inputClass).val()) {
    // build attributes object
    var attributes = {
      name: $(inputClass).val()
    };
    //build the Meteor method name
    var functionName = collection + operation;

    // call the Meteor method
    Meteor.call(functionName, attributes, function(error, result) {
      // show notifications
      if (error) {
        Notifications.error('Something is not right.', error.reason); 
      } else {
        Notifications.success(toTitleCase(collection) + ' added', 'The new ' + collection + ': <strong>' + attributes.name + '</strong> has been successfully added.');
        // reset input 
        $(inputClass).val('');
      }
    });
  }
};

// toTitleCase
// takes a string and converts to Title Case 
toTitleCase = function(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}