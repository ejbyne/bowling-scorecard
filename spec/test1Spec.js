describe('Frame', function(){

  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  describe('starting frames', function() {

    it('will start with its rolls record being an empty array', function() {
      expect(frame.rolls.length).toEqual(0);
    });

  });

  describe('finishing frames', function() {

    it('knows if a standard frame is finished if there is no strike', function() {
      frame.recordScore(3);
      expect(frame.isStandardFrameFinished()).toBe(false);
      frame.recordScore(3);
      expect(frame.isStandardFrameFinished()).toBe(true);
    });

    it('knows if a standard frame is finished if there is a strike', function() {
      frame.recordScore(10);
      expect(frame.isStandardFrameFinished()).toBe(true);
    });

    it('knows if the final frame is finished if there is a strike', function() {
      frame.recordScore(10);
      frame.recordScore(3);
      expect(frame.isFinalFrameFinished()).toBe(false);
      frame.recordScore(3);
      expect(frame.isFinalFrameFinished()).toBe(true);
    });

    it('knows if the final frame is finished if there is a spare', function() {
      frame.recordScore(5);
      frame.recordScore(5);
      expect(frame.isFinalFrameFinished()).toBe(false);
      frame.recordScore(3);
      expect(frame.isFinalFrameFinished()).toBe(true);
    });

  });

  describe("recording results", function() {

    it('will record the number of pins hit by a roll', function(){
      frame.recordScore(5);
      expect(frame.rolls[0]).toBe(5);
      expect(frame.score).toBe(5);
    });

    it('knows if a number is invalid', function() {
      frame.recordScore(9);
      expect(frame.isInvalidNumber(5)).toBe(true);
    });

  });

  describe("recording bonuses", function() {

    it('knows if there is a strike', function() {
      frame.recordScore(10);
      expect(frame.isStrike()).toBe(true);
    });

    it('knows if there is a spare', function() {
      frame.recordScore(5);
      frame.recordScore(5);
      expect(frame.isSpare()).toBe(true);
    });

    it('will record if there is a strike', function() {
      frame.recordScore(10);
      frame.recordIfStrikeOrSpare();
      expect(frame.bonus).toBe(2);
    });

    it('will record if there is a spare', function() {
      frame.recordScore(5);
      frame.recordScore(5);
      frame.recordIfStrikeOrSpare();
      expect(frame.bonus).toBe(1);
    });

  });

});