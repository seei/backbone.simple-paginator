
/**
 * Backbone.SimplePaginator v0.1.3
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
      var from = (this.currentPage - 1) * this.perPage;
      var to = from + this.perPage;

      if (!this.origModels) {
        this.origModels = this.models;
        this.totalPages = Math.ceil(this.origModels.length / this.perPage);
        this.splitWindow();
      }

      this.models = this.origModels.slice();
      this.reset(this.models.slice(from, to));
      this.trigger('turn', this.models, this);
    },

    splitWindow: function() {
      if (this.innerWindow) {
        this.innerLeft = Math.floor(this.innerWindow / 2);
        this.innerRight = Math.ceil(this.innerWindow / 2);
      }
    },

    info: function() {
      return {
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalPages: this.totalPages,
        lastPage: this.totalPages,
        next: this.getNext(),
        previous: this.getPrevious(),
        pageSet: this.getPageSet(),
        leftTruncated: this.leftTruncated(),
        rightTruncated: this.rightTruncated()
      }
    },

    getNext: function() {
      return (this.currentPage < this.totalPages) ? this.currentPage + 1 : false;
    },

    getPrevious: function() {
      return (this.currentPage > 1) ? this.currentPage - 1 : false;
    },

    leftTruncated: function() {
      return this.getPageSet()[0] > 1;
    },

    rightTruncated: function() {
      var pageSet = this.getPageSet();
      return pageSet[pageSet.length - 1] < this.totalPages;
    },

    getPageSet: function() {
      var pages = [];
      var totalPages = this.totalPages;
      var min = 1;
      var max = totalPages;

      if (this.innerLeft && this.innerRight) {
        min = this.currentPage - this.innerLeft;
        max = this.currentPage + this.innerRight;

        if (min < 1) {
          max = max + (1 - min);
          min = 1;
        }

        if (max >= totalPages) {
          min = min - (max - totalPages);
          if (min < 1) min = 1;
          max = totalPages;
        }
      }

      for (var i = min, l = max; i <= l; i++) {
        pages.push(i);
      }

      return pages;
    },

    totalLength: function() {
      return (this.origModels) ? this.origModels.length : 0;
    },

    fetch: function(options) {
      delete this.origModels;
      return Backbone.Collection.prototype.fetch.call(this, options);
    }

  });

}));
