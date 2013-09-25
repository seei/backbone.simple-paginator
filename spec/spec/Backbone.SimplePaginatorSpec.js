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

  describe('splitWindow', function() {
    it('should split 4 to left 2 and right 2', function() {
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.innerLeft).toEqual(2);
      expect(simplePaginator.innerRight).toEqual(2);
    });

    it('should split 3 to left 1 and right 2', function() {
      simplePaginator.innerWindow = 3;
      simplePaginator.splitWindow();

      expect(simplePaginator.innerLeft).toEqual(1);
      expect(simplePaginator.innerRight).toEqual(2);
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
      expect(info.leftTruncated).toBeDefined();
      expect(info.rightTruncated).toBeDefined();
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

  describe('leftTruncated', function() {
    it('should return "false" if "innerWindow" is undefined', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 10;
      simplePaginator.innerWindow = undefined;
      simplePaginator.splitWindow();

      expect(simplePaginator.leftTruncated()).toEqual(false);
    });

    it('should return "false" if not out of window', function() {
      simplePaginator.totalPages = 4;
      simplePaginator.currentPage = 4;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.leftTruncated()).toEqual(false);
    });

    it('should return "true" if out of window', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 10;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.leftTruncated()).toEqual(true);
    });
  });

  describe('rightTruncated', function() {
    it('should return "false" if "innerWindow" is undefined', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 1;
      simplePaginator.innerWindow = undefined;
      simplePaginator.splitWindow();

      expect(simplePaginator.rightTruncated()).toEqual(false);
    });

    it('should return "false" if not out of window', function() {
      simplePaginator.totalPages = 4;
      simplePaginator.currentPage = 1;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.rightTruncated()).toEqual(false);
    });

    it('should return "true" if out of window', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 1;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.rightTruncated()).toEqual(true);
    });
  });

  describe('getPageSet', function() {
    it('should not return first element under 1', function() {
      simplePaginator.totalPages = 4;
      simplePaginator.currentPage = 1;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([1, 2, 3, 4]);
    });

    it('should return 1..totalPages if not specified window', function() {
      simplePaginator.totalPages = 5;
      simplePaginator.innerWindow = undefined;

      expect(simplePaginator.getPageSet()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return 1..5 if currentPage is 1, and window is 4', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 1;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return 1..5 if currentPage is 3, and window is 4', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 3;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return 3..7 if currentPage is 5, and window is 4', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 5;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([3, 4, 5, 6, 7]);
    });

    it('should return 6..10 if currentPage is 8, and window is 4', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 8;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([6, 7, 8, 9, 10]);
    });

    it('should return 6..10 if currentPage is 10, and window is 4', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 10;
      simplePaginator.innerWindow = 4;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([6, 7, 8, 9, 10]);
    });

    it('should return 2..5 if currentPage is 3, and window is 3', function() {
      simplePaginator.totalPages = 10;
      simplePaginator.currentPage = 3;
      simplePaginator.innerWindow = 3;
      simplePaginator.splitWindow();

      expect(simplePaginator.getPageSet()).toEqual([2, 3, 4, 5]);
    });
  });

  describe('totalLength', function() {
    it('should return "origModels" length', function() {
      simplePaginator.origModels = [1, 2, 3, 4, 5];

      expect(simplePaginator.totalLength()).toEqual(5);
    });

    it('should return 0 if "origModels" is undefined', function() {
      simplePaginator.origModels = undefined;

      expect(simplePaginator.totalLength()).toEqual(0);
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
