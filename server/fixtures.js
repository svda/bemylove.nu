Meteor.startup(function () {

  /*
  * Fixtures
  */

  if (Guests.find().count() === 0) {
    var items = [{
        'name': 'Sander en Janneke',
        'n': '2',
        'postcode': '1091HE',
        'huisnummer': '100'
      }, {
        'name': 'Ria',
        'n': '1',
        'postcode': '1060RE',
        'huisnummer': '137'
      }];

    for (var i = 0; i < items.length; i++)
      Guests.insert({
        name: items[i].name,
        zipcode: items[i].postcode,
        number: items[i].huisnummer,
        n: items[i].n,
        visited: false,
        reply: {
          ceremonie: false,
          feest: false,
          taart: false
        }
      });
  }

});