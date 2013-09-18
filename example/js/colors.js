(function(exports) {

  exports.Colors = Backbone.SimplePaginator.extend({

    // how many items per page should be shown
    perPage: 4,

    // how many links around the current page should be shown
    innerWindow: 4

  });

})(window);
