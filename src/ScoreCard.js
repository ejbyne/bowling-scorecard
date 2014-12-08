function ScoreCard(player) {
  this.player = player;
  this.frames = [];
};

ScoreCard.prototype.enterRoll = function(pinsHit) {
  if (this.isGameFinished()) { return "Game over"; }
  this.checkIfNewFrame();
  if (this.currentFrame().isInvalidNumber(pinsHit)) { return "Incorrect number"; }
  this.recordScore(pinsHit);
  this.checkBonus(pinsHit);
};

ScoreCard.prototype.recordScore = function(pinsHit) {
  this.currentFrame().rolls.push(pinsHit);
  this.currentFrame().score += parseInt(pinsHit);
};

ScoreCard.prototype.checkIfNewFrame = function() {
  if (this.frames.length === 0 || (this.frames.length < 10 && this.currentFrame().isStandardFrameFinished())) {
    this.startFrame();
  }
};

ScoreCard.prototype.startFrame = function() {
  this.frames.push(new Frame());
};

ScoreCard.prototype.currentFrame = function() {
  return this.frames[this.frames.length-1];
};

ScoreCard.prototype.checkBonus = function(pinsHit) {
  if (this.frames.length < 10) { this.currentFrame().recordIfStrikeOrSpare(); }
  if (this.frames.length > 1) { this.addPreviousFramesBonus(pinsHit); }
}

ScoreCard.prototype.addPreviousFramesBonus = function(pinsHit) {
  this.frames.forEach(function(frame) {
    if (frame.bonus > 0) {
      frame.score += parseInt(pinsHit);
      frame.bonus--;
    }
  });
};

ScoreCard.prototype.totalScore = function() {
  var total = 0;
  for (var frame = 0; frame < this.frames.length; frame++) {
    var total = parseInt(total) + parseInt(this.frames[frame].score);
  } return total;
};

ScoreCard.prototype.isGameFinished = function() {
  return (this.frames.length === 10 && this.currentFrame().isFinalFrameFinished());
};

ScoreCard.prototype.isGutterGame = function() {
  return (this.isGameFinished() && this.totalScore() === 0);
};

ScoreCard.prototype.isPerfectGame = function() {
  return (this.isGameFinished() && this.totalScore() === 300);
};

// ScoreCard.prototype.totalScore = function() {
//   var total = 0
//   this.frames.forEach(function(frame) {
//     var total = parseInt(total) + parseInt(frame.score)
//   })
//   return total
// }
