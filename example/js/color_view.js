(function(exports) {

  exports.ColorView = Backbone.View.extend({

    template: _.template($('#color-view').html()),

    render: function() {
      this.setElement(this.template(this.model.toJSON()));
      return this;
    }

  });

})(window);
