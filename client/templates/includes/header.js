Template.header.helpers({
  week: function() {
    var now = new Date();
    var weekNumber = getWeekNumber(now);
    Session.set('currentWeek', weekNumber);
    var display = weekNumber[0] + "." + weekNumber[1] + ".";
    return display;
  }
})

// Template.header.events({
//   'keyup .week-number': function(e) {
//     // if enter is pressed then add goal to db
//     if (e.which == 13) {
//       Session.set('currentWeek', $(e.target).val());
//       Notifications.success('Timetravel successful', "Current week is: " + Session.get('currentWeek'));       
//     }   
//   }
// })

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