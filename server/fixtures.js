// Fixture data 
if (Views.find().count() === 0) {
  Views.insert({
    timeFrame: 'week'
  });
  Views.insert({
    timeFrame: 'month'
  });
  Views.insert({
    timeFrame: 'year'
  });
}