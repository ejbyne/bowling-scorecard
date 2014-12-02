describe('Player', function() {

  var player

  beforeEach(function() {
    player = new Player()
  })

  describe('name', function() {

    it('should be able to have a name', function() {
      player.setName('Ed')
      expect(player.name).toEqual('Ed')
    })

  })

})
