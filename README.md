# Backbone.SimplePaginator

Backbone.SimplePaginator is a small [Backbone.Collection](http://backbonejs.org/#Collection) plugin for composing the multi-page pagination component.

It was inspired by the [Backbone.Paginator](http://backbone-paginator.github.io/backbone.paginator/), to which credit is due.

## Installation

	$ bower install backbone.simple-paginator --save

or download the latest version [here](https://github.com/seei/backbone.simple-paginator/archive/0.1.2.zip), and include `backbone.simple-paginator.js` in your page, after Backbone and it's dependencies.

## Usage example

#### 1. Create a new paginated collection class with `perPage`

```javascript
var PaginatedCollection = Backbone.SimplePaginator.extend({
  
  // how many items per page should be shown
  perPage: 6

});
```

#### 2. Create a new pagination view class

```javascript
var PaginationView = Backbone.View.extend({

  template: _.template($('#pagination-view').html()),

  events: {
    'click a.first': 'goToFirst',
    'click a.prev': 'goToPrev',
    'click a.page': 'goToPage',
    'click a.next': 'goToNext',
    'click a.last': 'goToLast'
  },

  initialize: function() {
    // listen for "turn" event to be notified when paginating the collection
    this.listenTo(this.collection, 'turn', this.render, this);
  },

  goToFirst: function(e) {
    e.preventDefault();
    // go to the first page
    this.collection.goToFirst();
  },

  goToPrev: function(e) {
    e.preventDefault();
    // go to the previous page
    this.collection.goToPrevious();
  },

  goToPage: function(e) {
    e.preventDefault();
    // go to a specific page
    this.collection.goTo($(e.target).text());
  },

  goToNext: function(e) {
    e.preventDefault();
    // go to the next page
    this.collection.goToNext();
  },

  goToLast: function(e) {
    e.preventDefault();
    // go to the next page
    this.collection.goToLast();
  },

  render: function() {
    this.$el.html(this.template(this.collection.info()));
    return this;
  }

});
```

#### 3. Create a template for pagination UI

```html
<script type="text/template" id="pagination-view">
  <ul class="pagination">
    <% if (currentPage != 1) { %>
      <li><a href="#" class="first">&laquo;&laquo;</a></li>
    <% } else { %>
      <li class="disabled"><a href="#" class="first">&laquo;&laquo;</a></li>
    <% } %>

    <% if (currentPage != 1) { %>
      <li><a href="#" class="prev">&laquo;</a></li>
    <% } else { %>
      <li class="disabled"><a href="#" class="prev">&laquo;</a></li>
    <% } %>

    <% _.each(pageSet, function(p) { %>
      <% if (currentPage == p) { %>
        <li class="active"><a href="#" class="page"><%- p %></a></li>
      <% } else { %>
        <li><a href="#" class="page"><%- p %></a></li>
      <% } %>
    <% }); %>

    <% if (lastPage != currentPage && lastPage != 0) { %>
      <li><a href="#" class="next">&raquo;</a></li>
    <% } else { %>
      <li class="disabled"><a href="#" class="next">&raquo;</a></li>
    <% } %>

    <% if (lastPage != currentPage && lastPage != 0) { %>
      <li><a href="#" class="last">&raquo;&raquo;</a></li>
    <% } else { %>
      <li class="disabled"><a href="#" class="last">&raquo;&raquo;</a></li>
    <% } %>
  </ul>
</script>
```

## License

The MIT License (MIT)

Copyright (c) 2013 [Sei Kataoka](http://github.com/seei) &lt;sei@uniba.jp&gt;
