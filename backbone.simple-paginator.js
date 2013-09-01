
/**
 * Backbone.SimplePaginator v0.1.1
 * Copyright (c) 2013 Sei Kataoka <sei@uniba.jp>
 * Distributed under MIT license
 */

(function(root, factory) {

  var Backbone = root.Backbone;

  if (typeof define === 'function' && define.amd) {
    return define(['backbone'], function(Backbone) {
      return factory(Backbone);
    });
  }

  Backbone.SimplePaginator = factory(Backbone);

}(this, function(Backbone) {

  return Backbone.Collection.extend({

    currentPage: 1,

    perPage: 6,

    goToNext: function() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.pager();
      }
    },

    goToPrevious: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.pager();
      }
    },

    goTo: function(page) {
      if (page !== undefined) {
        this.currentPage = parseInt(page, 10);
        this.pager();
      }
    },

    goToFirst: function() {
      this.goTo(1);
    },

    goToLast: function() {
      this.goTo(this.totalPages);
    },

    pager: function() {
      var from = (this.currentPage - 1) * this.perPage
        , to = from + this.perPage;

      if (!this.origModels) {
        this.origModels = this.models;
        this.totalPages = Math.ceil(this.origModels.length / this.perPage);
      }

      this.models = this.origModels.slice();
      this.reset(this.models.slice(from, to));
      this.trigger('turn', this.models, this);
    },

    info: function() {
      return {
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalPages: this.totalPages,
        lastPage: this.totalPages,
        next: this.getNext(),
        previous: this.getPrevious(),
        pageSet: this.getPageSet()
      }
    },

    getNext: function() {
      return (this.currentPage < this.totalPages) ? this.currentPage + 1 : false;
    },

    getPrevious: function() {
      return (this.currentPage > 1) ? this.currentPage - 1 : false;
    },

    getPageSet: function() {
      var pages = [];

      for (var i = 1, l = this.totalPages; i <= l; i++) {
        pages.push(i);
      }

      return pages;
    },

    totalLength: function() {
      return this.origModels.length;
    },

    fetch: function(options) {
      delete this.origModels;
      return Backbone.Collection.prototype.fetch.call(this, options);
    }

  });

}));
