Template.header.rendered = function() {
    var now = new Date();
    var dateArray = getWeekNumber(now);
    Session.set('currentYear', dateArray[0]);
    Session.set('currentWeek', dateArray[1]);
}

Template.header.helpers({
  year: function(mod) {
    return parseInt(Session.get('currentYear'))+parseInt(mod);
  },
  week: function(mod) {
    return parseInt(Session.get('currentWeek'))+parseInt(mod);
  }
})

Template.header.events({
  'submit form': function(e) {
    e.preventDefault();

    var year = $(e.target).find('[name=year]').val();
    var week = $(e.target).find('[name=week]').val();
    
    Session.set('currentYear', year);
    Session.set('currentWeek', week);

    $("#year option:first").prop("selected", "selected");
    $("#week option:first").prop("selected", "selected");


    Notifications.success('Timetravel successful', "Current week is: " + Session.get('currentYear') + ". " + Session.get('currentWeek') + ".");
  }
})

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}