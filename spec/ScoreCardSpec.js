describe("ScoreCard", function() {

  var player, scorecard;

  var completeNineFrames = function() {
    for (i = 1; i <= 18; i++) {
    scorecard.enterRoll(1) }
  }

  beforeEach(function() {

    player = new Player("Ed");
    scorecard = new ScoreCard(player);

  });

  describe("starting a frame", function() {

    it("will add a frame to the player's scorecard", function() {
      scorecard.startFrame();
      expect(scorecard.frames.length).toBe(1);
    })

  })

  describe("recording results", function() {

    it("will record the number of pins hit by a roll", function(){
      scorecard.enterRoll(5);
      expect(scorecard.frames[0].rolls[0]).toBe(5);
    })

  })

  describe("starting the next frame", function() {

    it("will start a new frame if there have been two rolls in the current frame", function() {
      scorecard.enterRoll(5)
      scorecard.enterRoll(3)
      expect(scorecard.frames.length).toBe(1)
      scorecard.enterRoll(3)
      expect(scorecard.frames.length).toBe(2)
    })

    it("will start a new frame if there is a strike in the first roll of a frame", function() {
      scorecard.enterRoll(10)
      expect(scorecard.frames.length).toBe(1)
      scorecard.enterRoll(5)
      expect(scorecard.frames.length).toBe(2)
    })

    it("after starting a new frame will record the next roll in the new frame", function() {
      scorecard.enterRoll(5)
      scorecard.enterRoll(3)
      scorecard.enterRoll(4)
      expect(scorecard.frames[1].rolls[0]).toBe(4)
    })

  })

  describe("knowing when the game is finished", function() {

    it("will know the game is finished after 10 frames", function() {
      completeNineFrames()
      expect(scorecard.isFinished()).toBe(false)
      scorecard.enterRoll(2)
      scorecard.enterRoll(3)
      expect(scorecard.isFinished()).toBe(true)
    })

    it("will allow three rolls in the final frame if there is a strike", function() {
      completeNineFrames()
      scorecard.enterRoll(10)
      scorecard.enterRoll(8)
      expect(scorecard.isFinished()).toBe(false)
      scorecard.enterRoll(8)
      expect(scorecard.isFinished()).toBe(true)
    })

    it("will allow three rolls in the final frame if there is a spare", function() {
      completeNineFrames()
      scorecard.enterRoll(6)
      scorecard.enterRoll(4)
      expect(scorecard.isFinished()).toBe(false)
      scorecard.enterRoll(4)
      expect(scorecard.isFinished()).toBe(true)
    })

    it("will not allow another roll if the game is finished", function() {
      completeNineFrames()
      scorecard.enterRoll(1)
      scorecard.enterRoll(1)
      expect(scorecard.enterRoll(1)).toEqual("Game over")
    })

  })

  describe("keeping score", function() {

    it("will record the score for each frame", function(){
      scorecard.enterRoll(3)
      scorecard.enterRoll(5)
      expect(scorecard.frames[0].score).toBe(8)
    })

    it("will keep a record of the total score", function(){
      scorecard.enterRoll(3)
      scorecard.enterRoll(5)
      scorecard.enterRoll(6)
      scorecard.enterRoll(2)
      expect(scorecard.totalScore()).toBe(16)
    })

  })

  describe("scoring bonuses", function() {

    it("will give the player a bonus equivalent to the number of pins hit in the next roll if the player scores a spare", function() {
      scorecard.enterRoll(6)
      scorecard.enterRoll(4)
      scorecard.enterRoll(5)
      scorecard.enterRoll(3)
      expect(scorecard.frames[0].score).toBe(15)
      expect(scorecard.totalScore()).toBe(23)
    })

    it("will give the player a bonus equivalent to the number of pins hit in the next two rolls if the player scores a strike", function() {
      scorecard.enterRoll(10)
      scorecard.enterRoll(5)
      scorecard.enterRoll(3)
      expect(scorecard.frames[0].score).toBe(18)
      expect(scorecard.totalScore()).toBe(26)
    })

    it("will allow a maximum score of 300", function() {
      for (i = 1; i <= 12; i++) {
        scorecard.enterRoll(10)
      }
      expect(scorecard.isFinished()).toBe(true)
      expect(scorecard.totalScore()).toBe(300)
    })

  })

})