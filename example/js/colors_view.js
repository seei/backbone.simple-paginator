(function(exports) {

  exports.ColorsView = Backbone.View.extend({

    template: _.template($('#colors-view').html()),

    initialize: function() {
      _.bindAll(this, 'resetColors', 'addColors', 'addColor', 'render');

      this.listenTo(this.collection, 'turn', this.resetColors, this);

      this.collection.goToFirst();
    },

    resetColors: function() {
      this.$('.row').empty();
      this.addColors();
    },

    addColors: function() {
      this.collection.each(this.addColor);
    },

    addColor: function(color) {
      this.$('.row').append(new ColorView({ model: color }).render().el);
    },

    addPagination: function() {
      this.$el.append(new PaginationView({ collection: this.collection }).render().el);
    },

    render: function() {
      this.$el.html(this.template());
      this.addColors();
      this.addPagination();
      return this;
    }

  });

})(window);
