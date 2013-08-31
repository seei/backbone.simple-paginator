(function(exports) {

  exports.PaginationView = Backbone.View.extend({

    template: _.template($('#pagination-view').html()),

    events: {
      'click a.first': 'goToFirst',
      'click a.prev': 'goToPrev',
      'click a.page': 'goToPage',
      'click a.next': 'goToNext',
      'click a.last': 'goToLast'
    },

    initialize: function() {
      this.listenTo(this.collection, 'turn', this.render, this);
    },

    goToFirst: function(e) {
      e.preventDefault();
      this.collection.goToFirst();
    },

    goToPrev: function(e) {
      e.preventDefault();
      this.collection.goToPrevious();
    },

    goToPage: function(e) {
      e.preventDefault();
      this.collection.goTo($(e.target).text());
    },

    goToNext: function(e) {
      e.preventDefault();
      this.collection.goToNext();
    },

    goToLast: function(e) {
      e.preventDefault();
      this.collection.goToLast();
    },

    render: function() {
      this.$el.html(this.template(this.collection.info()));
      return this;
    }

  });

})(window);
