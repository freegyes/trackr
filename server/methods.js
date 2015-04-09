  Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },
  checkUserByEmail: function (email) {
    check(email, String);
    if (Meteor.users.findOne({'emails.address': email})) {
      return Meteor.users.findOne({'emails.address': email})._id;
    } else {
      return false;
    }
  },
  getUserEmail: function (id) {
    check(id, String);
    if (Meteor.users.findOne({_id: id})) {
      return  Meteor.users.findOne({_id: id}).emails[0].address;  
    } else {
      throw new Meteor.Error(404, 'Not found', 'No such user in database.');
      return false;
    };
  }
});