function ScoreCard(player) {
  this.player = player;
  this.frames = [];
}

ScoreCard.prototype.enterRoll = function(pinsHit) {
  if (this.isGameFinished()) { return "Game over"; }
  this._checkIfNewFrame();
  if (this.currentFrame().isInvalidNumber(pinsHit)) { return "Incorrect number"; }
  this.currentFrame().recordScore(pinsHit);
  this._checkBonus(pinsHit);
};

ScoreCard.prototype.currentFrame = function() {
  return this.frames[this.frames.length-1];
};

ScoreCard.prototype.totalScore = function() {
  var total = 0;
  for (var frame = 0; frame < this.frames.length; frame++) {
    total+= parseInt(this.frames[frame].score);
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

ScoreCard.prototype._checkIfNewFrame = function() {
  if (this.frames.length === 0 || (this.frames.length < 10 && this.currentFrame().isStandardFrameFinished())) {
    this._startFrame();
  }
};

ScoreCard.prototype._startFrame = function() {
  this.frames.push(new Frame());
};

ScoreCard.prototype._checkBonus = function(pinsHit) {
  if (this.frames.length < 10) { this.currentFrame().recordIfStrikeOrSpare(); }
  if (this.frames.length > 1) { this._addPreviousFramesBonus(pinsHit); }
};

ScoreCard.prototype._addPreviousFramesBonus = function(pinsHit) {
  for (var frame = 0; frame < this.frames.length-1; frame++) {
    if (this.frames[frame].bonus > 0) {
      this.frames[frame].score += parseInt(pinsHit);
      this.frames[frame].bonus--;
    }
  }
};
