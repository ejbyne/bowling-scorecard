describe("Game", function() {

  var player, scorecard;

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
      scorecard.startFrame();
      scorecard.recordRoll(5);
      expect(scorecard.frames[0].rolls[0]).toBe(5);
    })

  })

  describe("starting the next frame", function() {

    it("will start a new frame if there have been two rolls in the current frame", function() {
      scorecard.startFrame()
      scorecard.recordRoll(5)
      scorecard.recordRoll(3)
      expect(scorecard.frames.length).toBe(2)
    })

    it("will start a new frame if there is a strike in the first roll of a frame", function() {
      scorecard.startFrame()
      scorecard.recordRoll(10)
      expect(scorecard.frames.length).toBe(2)
    })

    it("after starting a new frame will record the next roll in the new frame", function() {
      scorecard.startFrame()
      scorecard.recordRoll(5)
      scorecard.recordRoll(3)
      scorecard.recordRoll(4)
      expect(scorecard.frames[1].rolls[0]).toBe(4)
    })

  })

  describe("knowing when the game is finished", function() {

    it("will know the game is finished after 10 frames", function() {
      frame = new Frame()
      frame.rolls = [1, 1]
      for (i = 1; i < 10; i++) {
        scorecard.frames.push(frame)
      }
      scorecard.startFrame()
      scorecard.recordRoll(2)
      expect(scorecard.isFinished).toBe(false)
      scorecard.recordRoll(3)
      expect(scorecard.isFinished).toBe(true)
    })

    it("will allow three rolls in the final frame if there is a strike", function() {
      frame = new Frame()
      frame.rolls = [1, 1]
      for (i = 1; i < 10; i++) {
        scorecard.frames.push(frame)
      }
      scorecard.startFrame()
      scorecard.recordRoll(10)
      scorecard.recordRoll(8)
      expect(scorecard.isFinished).toBe(false)
      scorecard.recordRoll(10)
      expect(scorecard.isFinished).toBe(true)
    })

    it("will allow three rolls in the final frame if there is a spare", function() {
      frame = new Frame()
      frame.rolls = [1, 1]
      for (i = 1; i < 10; i++) {
        scorecard.frames.push(frame)
      }
      scorecard.startFrame()
      scorecard.recordRoll(6)
      scorecard.recordRoll(4)
      expect(scorecard.isFinished).toBe(false)
    })

  })

  describe("keeping score", function() {

    it("will record the score for each frame", function(){
      scorecard.startFrame()
      scorecard.recordRoll(3)
      scorecard.recordRoll(5)
      expect(scorecard.frames[0].score).toBe(8)
    })

    it("will keep a record of the total score", function(){
      scorecard.startFrame()
      scorecard.recordRoll(3)
      scorecard.recordRoll(5)
      scorecard.recordRoll(6)
      scorecard.recordRoll(2)
      expect(scorecard.totalScore()).toBe(16)
    })

  })

  describe("scoring bonuses", function() {

    it("will give the player a bonus equivalent to the number of pins hit in the next roll if the player scores a spare", function() {
      scorecard.startFrame()
      scorecard.recordRoll(6)
      scorecard.recordRoll(4)
      scorecard.recordRoll(5)
      expect(scorecard.frames[0].score).toBe(15)
      expect(scorecard.totalScore()).toBe(20)
    })

    it("will give the player a bonus equivalent to the number of pins hit in the next two rolls if the player scores a strike", function() {
      
    })

  })

})