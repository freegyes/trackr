// Fixture data for views
if (Views.find().count() === 0) {
  Views.insert({
    order: 0,
    timeFrame: 'week',
    name: 'week'
  });
  Views.insert({
    order: 1,
    timeFrame: 'month',
    name: 'month'
  });
  Views.insert({
    order: 2,
    timeFrame: 'quarter',
    name: 'quarter'
  });
  Views.insert({
    order: 3,
    timeFrame: 'year',
    name: 'year'
  });
}

// Fixture data to set up dummy projects on first login
if (Boards.find().count() === 0) {
  Boards.insert({
    name: 'Tutorial board',
    submitted: new Date(),
    status: 'active',
    owner: "tutorial",
    hasAccess: []
  });

  var personalBoardId = Boards.findOne({name: 'Tutorial board'})._id;

  Projects.insert({
    name: 'Add new project',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Add new goals for weeks, months..',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Rename projects and goals',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Make projects inactive',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Delete anything',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Visit archives',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
  });
  Projects.insert({
    name: 'Be awesome',
    submitted: new Date(),
    status: 'active',
    board: personalBoardId,
    creator: "tutorial",
    responsible: null
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
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
    creator: "tutorial"
  });

  var date = dateModifier(new Date(), 'month', 1);

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
    creator: "tutorial"
  });

}