(function() {

  Meteor.startup(function () {

    Guests.allow({
      insert: function () { return isAdmin() },
      update: function (userId, docs) { return isOwner(docs) || isAdmin() },
      remove: function () { return isAdmin() }
    });

  });

  Meteor.methods({
    '/guests/login': function (guestId) {
      // We set the current user id to match the current guest id. This provides us with the most
      // basic auth mechanism possible.
      this.setUserId(guestId);
    }
  });

  function isAdmin () {
    var guest = Guests.searchGuest({ _id: Meteor.userId() });
    if(guest)
      return guest.zipcode == '1091HE' || '1094JX' || '1051KW';
    return false;
  }

  function isOwner (docs) {
    return _.all(docs, function(doc) {
      return doc._id === Meteor.userId();
    });
  }

})();