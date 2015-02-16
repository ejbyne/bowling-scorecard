describe("Message", function() {

  var container, message, scorecard;

  beforeEach(function() {
    container = $('<div></div>');
    message = new Message(container);
    scorecard = new ScoreCard();
  });

  it('displays the frame status', function() {
    message.addGameUpdate(scorecard, 'frameData');
    expect(container.html()).toEqual('Frame 1 Roll 1');
    scorecard.enterRoll(10);
    message.addGameUpdate(scorecard, 'frameData');
    expect(container.html()).toEqual('Frame 2 Roll 1');
  });

  it('displays the scorecard', function() {
    scorecard.enterRoll(10);
    message.addGameUpdate(scorecard, 'tableData');
    expect(container.html()).toEqual(
      '<tr><th>Frame</th><th>Roll</th><th>Pins</th><th>Frame score</th><th>Total score</th>' +
      '</tr><tr><td>1</td><td>1</td><td>10</td><td>10</td><td>10</td></tr>'
    );
  });

  it('displays if there has been a strike or a spare', function() {
    scorecard.enterRoll(10);
    message.addGameMessage(scorecard);
    expect(container.html()).toEqual('Strike!');
  });

  it('displays a message when the game is over', function() {
    for (var i = 1; i <= 12; i++) {
      scorecard.enterRoll(10);
    }
    message.addGameMessage(scorecard);
    expect(container.html()).toEqual('Perfect Game!');
  });

});
