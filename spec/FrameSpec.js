describe('Frame', function(){

  var frame

  beforeEach(function() {

    frame = new Frame

  });

  describe('creating a frame', function() {

    it('will start with its rolls record being an empty array', function() {
      expect(frame.rolls.length).toEqual(0);
    });

  })

})