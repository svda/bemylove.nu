var App = App || {};

(function() {

  Template.main.state = function () {
    return App.Session.state();
  }

  Template.main.guest = Template.rsvp.guest = function () {
    return App.Session.get('guest');
  };

  Template.rsvp.events = {
    'click #identify-btn': function (e) {
      e.preventDefault();
      var zipcode = $('#zipcode-input').val().toUpperCase();
      var number = $('#number-input').val();
      var guest = Guests.searchGuest({ zipcode: zipcode, number: number });
      if(guest)
        Guests.persistGuest(guest);
      else {
        App.Session.set('identify_error', 'Sorry, geen gasten met deze gegevens gevonden. Wil je de postcode zonder spaties invullen, en het huisnummer zonder toevoegingen?');
      }
    },
    'click #reply-btn': function (e) {
      e.preventDefault();
      var ceremonie = $('input[name="ceremonie"]').is(':checked');
      var feest = $('input[name="feest"]').is(':checked');
      //var taart = $('input[name="taart"]:checked').val();
      var taart = false;
      Guests.updateReply({
        ceremonie: ceremonie,
        feest: feest,
        taart: taart
      });
      App.Session.state('rsvp_saved');
    },
    'click #zipcode-input': function (e) {
      App.Session.set('identify_error', null);
    },
    'click #edit-reply-btn': function (e) {
      App.Session.state('rsvp_reply');
    }
  }

  Template.rsvp.saved = function () {
    return App.Session.state() == 'rsvp_saved';
  }

  Template.rsvp.replied = function () {
    var guest = App.Session.get('guest');
    if(guest && App.Session.state() != 'rsvp_reply' && App.Session.state() != 'rsvp_saved')
      return guest.replied;
    return false;
  }

  Template.rsvp.identify_error = function () {
    return App.Session.get('identify_error');
  };

  Template.rsvp.aantal = function () {
    var guest = App.Session.get('guest');
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

})();