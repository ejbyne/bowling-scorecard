describe('Player', function() {

  var player;

  beforeEach(function() {

    player = new Player('Ed');

  });

  describe('name', function() {

    it('should have a name', function() {
      expect(player.name).toEqual('Ed');
    });

  });

});
