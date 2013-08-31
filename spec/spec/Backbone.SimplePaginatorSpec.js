describe('Backbone.SimplePaginator', function() {
  var simplePaginator;

  beforeEach(function() {
    simplePaginator = new Backbone.SimplePaginator();
  });

  describe('goToNext', function() {
    beforeEach(function() {
      spyOn(simplePaginator, 'pager');
    });

    it('should increment "currentPage" by 1', function() {
      simplePaginator.currentPage = 4;
      simplePaginator.totalPages = 5;
      simplePaginator.goToNext();

      expect(simplePaginator.currentPage).toEqual(5);
    });

    it('should call "pager"', function() {
      simplePaginator.currentPage = 4;
      simplePaginator.totalPages = 5;
      simplePaginator.goToNext();

      expect(simplePaginator.pager).toHaveBeenCalled();
    });

    it('should not do anything if "currentPage" is GTE to "totalPages"', function() {
      simplePaginator.currentPage = 5;
      simplePaginator.totalPages = 5;
      simplePaginator.goToNext();

      expect(simplePaginator.currentPage).toEqual(5);
      expect(simplePaginator.pager).not.toHaveBeenCalled();
    });
  });

  describe('goToPrevious', function() {
    beforeEach(function() {
      spyOn(simplePaginator, 'pager');
    });

    it('should decrement "currentPage" by 1', function() {
      simplePaginator.currentPage = 5;
      simplePaginator.goToPrevious();

      expect(simplePaginator.currentPage).toEqual(4);
    });

    it('should call "pager"', function() {
      simplePaginator.currentPage = 5;
      simplePaginator.goToPrevious();

      expect(simplePaginator.pager).toHaveBeenCalled();
    });

    it('should not do anything if "currentPage" is LTE to 1', function() {
      simplePaginator.currentPage = 1;
      simplePaginator.goToPrevious();

      expect(simplePaginator.currentPage).toEqual(1);
      expect(simplePaginator.pager).not.toHaveBeenCalled();
    });
  });

  describe('goTo', function() {
    beforeEach(function() {
      spyOn(simplePaginator, 'pager');
    });

    it('should set "currentPage"', function() {
      simplePaginator.currentPage = 1;
      simplePaginator.goTo(5);

      expect(simplePaginator.currentPage).toEqual(5);
    });

    it('should call "pager"', function() {
      simplePaginator.goTo(5);

      expect(simplePaginator.pager).toHaveBeenCalled();
    });

    it('should not do anything if "page" is undefined', function() {
      simplePaginator.currentPage = 1;
      simplePaginator.goTo();

      expect(simplePaginator.currentPage).toEqual(1);
      expect(simplePaginator.pager).not.toHaveBeenCalled();
    });
  });

  describe('goToFirst', function() {
    it('should set 1 to "currentPage"', function() {
      simplePaginator.currentPage = 5;
      simplePaginator.goToFirst();

      expect(simplePaginator.currentPage).toEqual(1);
    });
  });

  describe('goToLast', function() {
    it('should set "totalPages" to "currentPage"', function() {
      simplePaginator.currentPage = 1;
      simplePaginator.totalPages = 5;
      simplePaginator.goToLast();

      expect(simplePaginator.currentPage).toEqual(5);
    });
  });

  describe('pager', function() {
    var colors;

    beforeEach(function() {
      colors = new Backbone.SimplePaginator(generateColors());
    });

    it('should set "origModels" and "totalPages" if "origModels" is undefined', function() {
      colors.origModels = undefined;
      colors.totalPages = undefined;
      colors.goToFirst();

      expect(colors.origModels).toBeDefined();
      expect(colors.totalPages).toBeDefined();
    });

    it('should reset sliced "origModels" to "models"', function() {
      colors.perPage = 6;
      colors.goToFirst();
      expect(colors.models).toEqual(colors.origModels.slice(0, 6));

      colors.goToNext();
      expect(colors.models).toEqual(colors.origModels.slice(6, 12));
    });

    it('should trigger "turn" event', function() {
      var fired = false;

      colors.on('turn', function() { fired = true });
      colors.goToFirst();

      expect(fired).toEqual(true);
    });
  });

  describe('info', function() {
    var colors;

    beforeEach(function() {
      colors = new Backbone.SimplePaginator(generateColors());
    });

    it('should return information', function() {
      var info;

      colors.goToFirst();
      info = colors.info();

      expect(info.currentPage).toBeDefined();
      expect(info.perPage).toBeDefined();
      expect(info.totalPages).toBeDefined();
      expect(info.lastPage).toBeDefined();
      expect(info.next).toBeDefined();
      expect(info.previous).toBeDefined();
      expect(info.pageSet).toBeDefined();
    });
  });

  describe('getNext', function() {
    it('should return 1 greater than "currentPage"', function() {
      simplePaginator.currentPage = 4;
      simplePaginator.totalPages = 5;

      expect(simplePaginator.getNext()).toEqual(5);
    });

    it('should return "false" if "currentPage" is GTE to "totalPages"', function() {
      simplePaginator.currentPage = 5;
      simplePaginator.totalPages = 5;

      expect(simplePaginator.getNext()).toEqual(false);
    });
  });

  describe('getPrevious', function() {
    it('should return 1 less than "currentPage"', function() {
      simplePaginator.currentPage = 5;

      expect(simplePaginator.getPrevious()).toEqual(4);
    });

    it('should return "false" if "currentPage" is LTE to 1', function() {
      simplePaginator.currentPage = 1;

      expect(simplePaginator.getPrevious()).toEqual(false);
    });
  });

  describe('getPageSet', function() {
    it('should return 1..totalPages', function() {
      simplePaginator.totalPages = 5;

      expect(simplePaginator.getPageSet()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('totalLength', function() {
    it('should return "origModels" length', function() {
      simplePaginator.origModels = [1, 2, 3, 4, 5];

      expect(simplePaginator.totalLength()).toEqual(5);
    });
  });

  describe('fetch', function() {
    it('should delete "origModels"', function() {
      spyOn(Backbone.Collection.prototype, 'fetch');

      simplePaginator.origModels = [1, 2, 3, 4, 5];
      simplePaginator.fetch();

      expect(simplePaginator.origModels).toBeUndefined();
    });
  });
});
