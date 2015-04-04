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

// builds a string from the current date that can be displayed
displayCurrentDate = function(date) {
  return moment(date).format('YYYY. MM. DD.')
}

// formats the date and returns an integer
dateFormatter = function(date, formatter) {
  return parseInt(date.format(formatter));
}

// toTitleCase
// takes a string and converts to Title Case 
toTitleCase = function(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

// buildHeader
// takes a date and a view and different modifiers
// returns an object for building the view headers
buildHeader = function(date, view, dateMod, viewMod, viewOrder, viewIndex, returnObject) {

  var returnObject = {};

  var modViewString = viewOrder[viewIndex + parseInt(viewMod)] + "s";
  
  if (dateMod < 0) {
    dateMod = -1 * dateMod;
    returnObject.date = moment(date).subtract(dateMod , modViewString);
  } else {
    returnObject.date = moment(date).add(dateMod , modViewString);
  };
  
  returnObject.view = viewOrder[viewIndex + parseInt(viewMod)];
  returnObject.year = parseInt(moment(returnObject.date).format('YYYY'));
  returnObject.quarter = parseInt(moment(returnObject.date).format('Q'));
  returnObject.month = parseInt(moment(returnObject.date).format('M'));
  returnObject.week = parseInt(moment(returnObject.date).format('w'));
  returnObject.startDate = moment(returnObject.date).startOf(viewOrder[viewIndex + parseInt(viewMod)])

  return returnObject;
}