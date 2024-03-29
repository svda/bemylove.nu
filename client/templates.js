var App = App || {};

(function() {

  Template.main.admin = function () {
    return App.Session.state() == 'admin';
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
      if(guest) {
        Guests.persistGuest(guest);
        Meteor.call('/guests/login', guest._id);
      }
      else {
        App.Session.set('identify_error', true);
      }
    },
    'click #reply-btn': function (e) {
      e.preventDefault();
      var ceremonie = $('#reply-form input[name="reply_ceremonie"]:checked').val() == 'true';
      var diner = $('#reply-form input[name="reply_diner"]:checked').val() == 'true';
      var feest = $('#reply-form input[name="reply_feest"]:checked').val() == 'true';
      var aantal = $('select[name="reply_aantal"]').val();
      var taart = false;
      Guests.updateReply({
        ceremonie: ceremonie,
        diner: diner,
        feest: feest,
        n: aantal,
        taart: taart
      });
      App.Session.state('rsvp_saved');
      Meteor.flush();
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

  Template.rsvp.equal = function (a, b) {
    return a == b;
  };

  Template.admin.guests = function () {
    return Guests.find();
  }

  Template.admin.events = {
    'click td.invite input': function (e) {
      var row = $(e.target).parent().parent().parent();
      var id = row.data('id');
      Guests.update({
        _id: id
      }, {
        $set: {
          invite: {
            ceremonie: row.find('input[name="invite_ceremonie"]').is(':checked'),
            diner: row.find('input[name="invite_diner"]').is(':checked'),
            feest: row.find('input[name="invite_feest"]').is(':checked')
          }
        }
      }, function (error) {
        if(error)
          console.log(error);
      })
      Meteor.flush();
    },
    'click td.reply input': function (e) {
      var row = $(e.target).parent().parent().parent();
      var id = row.data('id');
      Guests.update({
        _id: id
      }, {
        $set: {
          'reply.ceremonie': row.find('input[name="reply_ceremonie"]').is(':checked'),
          'reply.diner': row.find('input[name="reply_diner"]').is(':checked'),
          'reply.feest': row.find('input[name="reply_feest"]').is(':checked')
        }
      }, function (error) {
        if(error)
          console.log(error);
      })
      Meteor.flush();
    },
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