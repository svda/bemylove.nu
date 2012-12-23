var App = App || {};

(function () {

  var Router = Backbone.Router.extend({
    routes: {
      "beheer": "admin"
    },
    admin: function () {
      console.log('ok');
      App.Session.state('admin');
    }
  });

  App.Router = new Router;

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });

})();
