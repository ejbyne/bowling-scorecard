function Frame() {
  this.rolls = [];
  this.score = 0;
  this.bonus = 0;
}

Frame.prototype.isInvalidNumber = function(pinsHit) {
  return (this.rolls.length === 1 && this.score < 10 && pinsHit > (10 - this.score));
};

Frame.prototype.recordScore = function(pinsHit) {
  this.rolls.push(pinsHit);
  this.score += parseInt(pinsHit);
};

Frame.prototype.isStrike = function() {
  return (this.rolls[0] === 10);
};

Frame.prototype.isSpare = function() {
  return (this.rolls[0] !== 10 && this.rolls.length === 2 && this.score === 10);
};

Frame.prototype.recordIfStrikeOrSpare = function() {
  if (this.isStrike()) { this.bonus = 2; }
  else if (this.isSpare()) { this.bonus = 1; }
};

Frame.prototype.isStandardFrameFinished = function() {
  return (this.isStrike() || this.rolls.length === 2);
};

Frame.prototype.isFinalFrameFinished = function() {
  return ((this.rolls.length === 2 && this.score < 10) || this.rolls.length === 3);
};