// Fixture data for views
if (Views.find().count() === 0) {
  Views.insert({
    timeFrame: 'week'
  });
  Views.insert({
    timeFrame: 'month'
  });
  Views.insert({
    timeFrame: 'quarter'
  });
  Views.insert({
    timeFrame: 'year'
  });
}

// Fixture data to set up dummy projects on first login
if (Projects.find().count() === 0) {
  Projects.insert({
    name: 'This is a test project (active)',
    submitted: new Date(),
    status: 'active',
    owner: null
  });
  Projects.insert({
    name: 'This is a test project (inactive)',
    submitted: new Date(),
    status: 'inactive',
    owner: null
  });
  // set goals for weeks
  var date = dateModifier(new Date(), 'week', -1);

  Goals.insert({
    name: 'A goal that was partially reached',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "partially-reached",
    owner: null
  });
  Goals.insert({
    name: 'Another one',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "partially-reached",
    owner: null
  });
  Goals.insert({
    name: 'This was completely reached',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "reached",
    owner: null
  });
  Goals.insert({
    name: 'This we were not able to reach',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "not-reached",
    owner: null
  });
  Goals.insert({
    name: 'And we haven\'t set a state yet',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

  var date = dateModifier(new Date(), 'week', 0);

  Goals.insert({
    name: 'This week we have new goals',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'That can drive us forward',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

  var date = dateModifier(new Date(), 'week', 1);
  
  Goals.insert({
    name: 'And lead the way to the future',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne()._id,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

}