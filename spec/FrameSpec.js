describe('Frame', function(){

  var frame

  beforeEach(function() {

    frame = new Frame

  });

  describe('creating a frame', function() {

    it('with data for three rolls', function() {
      expect(Object.keys(frame.rolls).length).toEqual(3);
    });

    it('with initial values of zero for each roll', function() {
      expect(frame.rolls['roll1'] + frame.rolls['roll2'] + frame.rolls['roll3']).toEqual(0);
    });

  });

  describe('recording the roll result', function() {

    it('with the number of being pins being struck being recorded', function() {
      frame.recordScore('roll1', 5)
      expect(frame.rolls['roll1']).toEqual(5);
    });

  });

});