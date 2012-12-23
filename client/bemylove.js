var App = App || {};

(function() {

  App.Guests = {

    updateReply: function (properties) {
      var guest = App.State.get('guest');
      Guests.update({ _id: guest._id }, { $set: {
        replied: true,
        reply: properties
      } }, function (error) {
        if(error)
          console.log(error);
        else {
          Session.set('state', 'rsvp_saved');
        }
      });
    },

    searchGuest: function (properties) {
      if(_.keys(properties).length) // We need this because otherwise the first row will be returned.
        return Guests.findOne(properties);
      return false;
    }

  };

  Template.main.state = function () {
    return Session.get('state');
  }

  Template.rsvp.saved = function () {
    return App.State.equals('state', 'rsvp_saved');
  }

  Template.main.guest = Template.navbar.guest = Template.rsvp.guest = Template.rsvp_reply.guest = function () {
    return App.State.get('guest');
  };

  Template.rsvp.replied = function () {
    if(App.State.get('state') == 'rsvp_reply' || App.State.get('state') == 'rsvp_saved')
      return false;

    var guest = App.State.get('guest');
    if(guest)
      return guest.replied;
    return false;
  }

  Template.rsvp.events = {
    'click #edit-reply-btn': function (e) {
      App.State.set('state', 'rsvp_reply');
    }
  }

  Template.rsvp_identify.events = {
    'click #identify-btn': function (e) {
      e.preventDefault();
      var zipcode = $('#zipcode-input').val().toUpperCase();
      var number = $('#number-input').val();
      var guest = App.Guests.searchGuest({ zipcode: zipcode, number: number });
      if(guest)
      {
        App.State.set('guest', guest);
        $.cookie( 'guest_id', guest._id );
      }
      else
        Session.set('identify_error', 'Sorry, geen gasten met deze gegevens gevonden. Wil je de postcode zonder spaties invullen, en het huisnummer zonder toevoegingen?');
    }
  };

  Template.rsvp_identify.error = function () {
    return Session.get('identify_error');
  };

  Template.rsvp_reply.events = {
    'click #reply-btn': function (e) {
      e.preventDefault();
      var ceremonie = $('input[name="ceremonie"]').val();
      var feest = $('input[name="feest"]').val();
      var taart = $('input[name="taart"]:checked').val();
      App.Guests.updateReply({
        ceremonie: Boolean(ceremonie),
        feest: Boolean(feest),
        taart: Boolean(taart)
      });
      App.State.set('state', 'rsvp_replied');
    },
    'click #zipcode-input': function (e) {
      Session.set('reply_error', null);
    }
  };

  Template.rsvp_reply.aantal = function () {
    var guest = App.State.get('guest');
    var n = [];
    for(var i = 1; i <= guest.n; i++) {
      n.push(i);
    }
    return n;
  };

  Template.rsvp_add.guests = function () {
    return Guests.find();
  }

  Template.rsvp_add.events = {
    'click #add-btn': function (e) {
      e.preventDefault();
      Guests.insert({
        name: $('input[name="name"]').val(),
        zipcode: $('input[name="zipcode"]').val(),
        number: $('input[name="number"]').val(),
        n: $('input[name="n"]').val()
      }, function (error) {
        console.log(error);
      });
      $('#add-form input').val('');
    }
  }

  Handlebars.registerHelper("state", function(state) {
    if (optionalValue) {
      console.log("Value");
      console.log(optionalValue);
    }
  });

})();