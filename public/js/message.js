function Message(el) {
  this.el = $(el);
};

Message.prototype.addGameStatus = function(scorecard) {
  var message = this._printGameStatus(scorecard);
  (this.el).html(message).fadeIn(1000);
};

Message.prototype.addTableData = function(scorecard) {
  var message = this._printTableData(scorecard);
  (this.el).html(message).fadeIn(1000);
};

Message.prototype.addGameMessage = function(scorecard) {
  var message = this._printGameMessage(scorecard);
  if (message !== '') {
    (this.el).html(message).show('slide', 500);
    if (scorecard.isGameFinished() === false) { (this.el).hide('blind', 1000); }
  }
};

Message.prototype._printGameStatus = function(scorecard) {
  if (scorecard.isGameFinished()) {
    return 'Game Over';
  }
  else if (scorecard.frames.length === 0 ) {
    return 'Frame 1 Roll 1';
  }
  else {
    return this._printCurrentFrameAndRoll(scorecard);
  }
};

Message.prototype._printTableData = function(scorecard) {
  var data = '<tr><th>Frame</th><th>Roll</th><th>Pins</th><th>' +
  'Frame score</th><th>Total score</th></tr>';
  for (var frame = 0; frame < scorecard.frames.length; frame++) {
    for (var roll = 0; roll < scorecard.frames[frame].rolls.length; roll++) { 
      var frameScore = this._printFrameScore(scorecard, frame, roll);
      var totalScore = this._printTotalScore(scorecard, frame, roll);
      data = data + this._printTableRow(scorecard, frame, roll, frameScore, totalScore);
    }
  }
  return data;
};

Message.prototype._printGameMessage = function(scorecard) {
  if (scorecard.isGameFinished()) {
    return this._printGameOverMessage(scorecard);
  }
  else {
    return this._printStrikeOrSpareMessage(scorecard);
  }
};

Message.prototype._printCurrentFrameAndRoll = function(scorecard) {
  if (scorecard.frames.length < 10 && scorecard.currentFrame().isStandardFrameFinished()) {
    var frame = parseInt(scorecard.frames.length + 1);
    var roll = 1;
  }
  else {
    var frame = scorecard.frames.length;
    var roll = parseInt(scorecard.currentFrame().rolls.length + 1);
  }
  return ('Frame ' + frame + ' Roll ' + roll);
};

Message.prototype._printFrameScore = function(scorecard, frame, roll) {
  if (roll === scorecard.frames[frame].rolls.length-1) {
    return scorecard.frames[frame].score;
  }
  else {
    return ''; }
};

Message.prototype._printTotalScore = function(scorecard, frame, roll) {
  if (frame === scorecard.frames.length-1 &&
    roll === scorecard.frames[frame].rolls.length-1) {
    return scorecard.totalScore();
  }
  else {
    return '';
  }
};

Message.prototype._printTableRow = function(scorecard, frame, roll, frameScore, totalScore) {
  return '<tr><td>' + (frame + 1) + '</td><td>' + (roll + 1) +
         '</td><td>' + (scorecard.frames[frame].rolls[roll]) + '</td><td>' +
         frameScore + '</td><td>' + totalScore + '</td></tr>';
};

Message.prototype._printGameOverMessage = function(scorecard) {
  if (scorecard.isGutterGame()) {
    return 'Gutter Game!';
  }
  else if (scorecard.isPerfectGame()) {
    return 'Perfect Game!';
  }
  else {
    return 'Nice Try!';
  }
};

Message.prototype._printStrikeOrSpareMessage = function(scorecard) {
  if (scorecard.currentFrame().isStrike()) {
    return 'Strike!';
  }
  else if (scorecard.currentFrame().score === 10) {
    return 'Spare!';
  }
  else {
    return '';
  }
};
