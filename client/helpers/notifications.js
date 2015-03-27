Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
        timeout: 6000
    });
});    
