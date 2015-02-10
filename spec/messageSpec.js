describe("Message", function() {

  var container, message;

  beforeEach(function() {
    container = $("<div></div>");
    message = new Message(container);
  });

  it('displays game information', function() {
    message.addText('Test Message');
    expect(container.html()).toMatch(/Test Message/);
  });

  // it('displays game messages', function() {
  //   var player = new Player();
  //   var scorecard = new ScoreCard(player);
  //   message.addGameMessage(scorecard, 'Test Message');
  //   expect(container.html()).toMatch(/TestMessage/);
  // });

});
