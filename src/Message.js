function Message(el) {
  this.el = $(el);
  return this;
}

Message.prototype.printGameStatus = function(scorecard) {
  if (scorecard.frames.length === 0 ) { return 'Frame 1 Roll 1' }
  else if (scorecard.isFinished()) { return 'Game Over' }
  else {
    if ((scorecard.currentFrame().rolls.length === 2 || scorecard.currentFrame().rolls[0] === 10) && scorecard.frames.length < 10) {
      var frame = parseInt(scorecard.frames.length + 1)
      var roll = 1
    } else {
      var frame = scorecard.frames.length
      var roll = parseInt(scorecard.currentFrame().rolls.length + 1)
    }
    return 'Frame ' + frame + ' Roll ' + roll
  }
}

Message.prototype.printData = function(scorecard) {
  var data = '<tr><th>Frame</th><th>Roll</th><th>Pins</th><th>Frame score</th><th>Total score</th></tr>';
  for (var frame = 0; frame < scorecard.frames.length; frame++) {
    for (var roll = 0; roll < scorecard.frames[frame].rolls.length; roll++) { 
      if (roll === scorecard.frames[frame].rolls.length-1) { var frameScore = scorecard.frames[frame].score
      } else { var frameScore = '' }
      if (frame === scorecard.frames.length-1 && roll === scorecard.frames[frame].rolls.length-1 ) { var totalScore = scorecard.totalScore()
      } else { var totalScore = '' }
      var data = data + ('<tr><td>' + (frame + 1) + '</td><td>' + (roll + 1) + '</td><td>' + (scorecard.frames[frame].rolls[roll]) + '</td><td>' + frameScore + '</td><td>' + totalScore + '</td></tr>');
    }
  }
  return data
}

Message.prototype.printGameMessage = function(scorecard) {
  if(scorecard.isFinished() === false) {
    if(scorecard.currentFrame().rolls[0] === 10) {
      return "Strike!" }
    else if (scorecard.currentFrame().score === 10) {
      return "Spare!" }
    else { return "" }
  }
  if(scorecard.isFinished()) {
    if(scorecard.gutterGame()) {
      return "Gutter Game!" }
    else if(scorecard.perfectGame()) {
      return "Perfect Game!" }
    else { return "Nice Try!" }
  }
}

Message.prototype.addText = function(message) {
  (this.el).html(message).fadeIn(1000)
}

Message.prototype.addGameMessage = function(scorecard, message) {
  if (message != "") {
    (this.el).html(message).show('slide', 500)
    if (scorecard.isFinished() === false) {
      (this.el).hide('blind', 1000) }
  }
}
