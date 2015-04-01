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
if (Boards.find().count() === 0) {
  Boards.insert({
    name: 'Tutorial board',
    submitted: new Date(),
    status: 'active',
    owner: null
  });

  var personalBoardId = Boards.findOne({name: 'Tutorial board'})._id;

  Projects.insert({
    name: 'Add new project',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Add new goals for weeks, months..',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Rename projects and goals',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Make projects inactive',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Delete anything',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Visit archives',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });
  Projects.insert({
    name: 'Be awesome',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    owner: null
  });

  // set goals for weeks
  var date = dateModifier(new Date(), 'week', -1);

  Goals.insert({
    name: 'add a new project to this board below',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new project'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "partially-reached",
    owner: null
  });
  Goals.insert({
    name: 'set the state of these two goals reached',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new project'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "partially-reached",
    owner: null
  });
  Goals.insert({
    name: 'add a new project-goal for this week',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new goals for weeks, months..'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'change to Month view',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new goals for weeks, months..'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'rename a project and a goal',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Rename projects and goals'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

  var date = dateModifier(new Date(), 'week', 0);

  Goals.insert({
    name: 'make a project inactive',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Make projects inactive'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'step forward and backward in time',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new goals for weeks, months..'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'then reset to today by clicking the date',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new goals for weeks, months..'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'delete a goal',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Delete anything'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'delete a project',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Delete anything'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });
  Goals.insert({
    name: 'visit the archives',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Visit archives'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

  var date = dateModifier(new Date(), 'week', 1);
  
  Goals.insert({
    name: 'start now :)',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Be awesome'})._id,
    board: personalBoardId,
    view: 'week',
    submitted: new Date(),
    status: "default",
    owner: null
  });

  var date = dateModifier(new Date(), 'month', 0);

  Goals.insert({
    name: 'change back to Week view',
    year: dateFormatter(date, 'YYYY'),
    quarter: dateFormatter(date, 'Q'),
    month: dateFormatter(date, 'M'),
    week: dateFormatter(date, 'w'),
    project: Projects.findOne({name: 'Add new goals for weeks, months..'})._id,
    board: personalBoardId,
    view: 'month',
    submitted: new Date(),
    status: "default",
    owner: null
  });

}