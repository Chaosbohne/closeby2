CreateIndexController = RouteController.extend({
  
  yieldTemplates: {
    'CreateMap': {to: 'side'}
  },
  
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
