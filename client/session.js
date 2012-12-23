var App = App || {};

(function () {

  var VALID_STATES = [
    'identify',
    'rsvp_reply',
    'rsvp_saved',
    'admin'
  ];

  var VALID_KEYS = [
    'guest',
    'identify_error',
    'reply_error'
  ];

  var KEY_PREFIX = "App.";

  var validateSessionKey = function (key) {
    if (!_.contains(VALID_KEYS, key))
      throw new Error("Invalid key in Session: " + key);
  };

  var validateState = function (key) {
    if (!_.contains(VALID_STATES, key))
      throw new Error("Invalid state in Session: " + key);
  };

  App.Session = {
    set: function (key, value) {
      validateSessionKey(key);
      Session.set(KEY_PREFIX + key, value);
    },

    get: function (key) {
      validateSessionKey(key);
      return Session.get(KEY_PREFIX + key);
    },

    equals: function (key, value) {
      validateSessionKey(key);
      return Session.equals(KEY_PREFIX + key, value);
    },

    /* Function to get and set the current app state.
     */
    state: function (state) {
      if(!arguments.length) {
        return Session.get(KEY_PREFIX + 'state');
      }
      validateState(state);
      Session.set(KEY_PREFIX + 'state', state);
      console.log('Set state to ' + state);
    }
  }

  Meteor.startup(function () {

    Meteor.autorun(function () {
      var guestId = $.cookie('guest_id');
      if(guestId) {
        var guest = Guests.searchGuest({ _id: guestId });
        App.Session.set('guest', guest);
      }
    });

  });

}) ();