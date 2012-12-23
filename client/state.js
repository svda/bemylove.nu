(function () {

  var guestId = $.cookie('guest_id');

  var VALID_KEYS = [
    'state',
    'guest'
  ];

  var KEY_PREFIX = "App.";

  var validateKey = function (key) {
    if (!_.contains(VALID_KEYS, key))
      throw new Error("Invalid key in appState: " + key);
  };

  App.State = {
    set: function (key, value) {
      validateKey(key);
      Session.set(KEY_PREFIX + key, value);
      console.log('Set ' + key + ' to ' + value);
      console.log(value);
    },

    get: function (key) {
      validateKey(key);
      return Session.get(KEY_PREFIX + key);
    },

    equals: function (key, value) {
      validateKey(key);
      return Session.equals(KEY_PREFIX + key, value);
    }
  }

  Meteor.startup(function () {

    Meteor.autorun(function () {
      var state = App.State.get('state');
      var guest = App.Guests.searchGuest({ _id: guestId });
    });

  });

}) ();