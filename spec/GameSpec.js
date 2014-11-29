describe('Game', function() {

  var player1, player2, game;

  beforeEach(function() {

    player = new Player('Ed');
    // player2 = new Player('Henry');
    game = new Game(player, scorecard);
    scorecard1 = new ScoreCard(player);
    frame = new Frame();

  });

  // describe('starting the game', function() {

  //   it('with two players', function() {
  //     expect(game.player1).toEqual(player1);
  //     expect(game.player2).toEqual(player2);
  //   });

  //   it('with Player 1 having the first turn', function() {
  //     expect(game.turn).toEqual(player1);
  //   });

  //   it('and being able to switch turns', function() {
  //     game.switchTurns();
  //     expect(game.turn).toEqual(player2);
  //   });

  //   it('and switch back to Player 1', function() {
  //     game.switchTurns();
  //     game.switchTurns();
  //     expect(game.turn).toEqual(player1);
  //   });

  // });

  describe('playing a frame', function() {

    it("will record a frame on the player's scorecard", function() {
      game.startFrame();
    });

    it('will record the number of pins struck by a roll', function() {
      game.roll(frame, 1, 3)
      expect(frame['roll1']).toEqual(3);
    });

  });

});