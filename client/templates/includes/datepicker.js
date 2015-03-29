Template.datepicker.rendered = function() {
  $('#datepicker').datepicker({
      todayBtn: true,
      calendarWeeks: true,
      todayHighlight: true,
  });
}

Template.datepicker.events({
  'click .set-date': function() {
    var date = moment($("#datepicker").datepicker('getFormattedDate'), "MM-DD-YYYY").toDate();
    dateSetter(date);
    Session.set('currentDate', date);
    Notifications.success('Timetravel successful', "Current date is: " + displayCurrentDate(date));
  }
})
