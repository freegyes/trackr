Template.goalsHeading.helpers({
  // formats the date and returns an integer based on the view
  displayHeaderDate: function(date, view, range) {
    var formatter = '';
    switch (view) {
      case 'week':
        formatter = 'w[. week]';
        break;
      case 'month':
        formatter = 'MMMM';
        break;
      case 'quarter':
        formatter = '[Q]Q';
        break;
      case 'year':
        formatter = 'YYYY[.]';
        break;
      default:
        break;
    }
    if (range) {
      switch (view) {
      case 'week':
        formatter = 'YYYY[.] MM[.] DD[.]';
        // weekday hack to show monday as first (suday has the zero index)
        var from = moment(date).startOf(view).weekday(1).format(formatter);
        var to = moment(date).startOf(view).weekday(7).format(formatter);
        return from + " - " + to;
        break;
      case 'month':
        formatter = 'YYYY[.] MM[.]';
        break;
      case 'quarter':
        formatter = 'YYYY[.] MMMM [- ]';
        var from = moment(date).startOf(view).format(formatter);
        formatter = 'MMMM';
        var to = moment(date).endOf(view).format(formatter);
        return from + to;
        break;
      case 'year':
        return false;
        break;
      default:
        break;
      }
    };
    return moment(date).format(formatter);
  } 
});