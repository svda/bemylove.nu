var Guests = new Meteor.Collection("guests");

_.extend( Guests, {
	updateReply: function (properties) {
      var guest = App.Session.get('guest');
      Guests.update({ _id: guest._id }, { $set: {
        replied: true,
        reply: properties
      } }, function (error) {
        if(error)
          console.log(error);
      });
    },

    searchGuest: function (properties) {
      if(_.keys(properties).length) // We need this because otherwise the first row will be returned.
        return Guests.findOne(properties);
      return false;
    },

    persistGuest: function (guest) {
      $.cookie( 'guest_id', guest._id );
      App.Session.set('guest', guest);
    }
});