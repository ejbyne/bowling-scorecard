function Frame() {
  this.rolls = [];
  this.score = 0;
  this.bonus = 0;
}

Frame.prototype.isInvalidNumber = function(pinsHit) {
  if (this.rolls.length < 3 && pinsHit > (10 - this.score)) { return true }
  else { return false }
}

Frame.prototype.isStrike = function() {
  if (this.rolls[0] === 10) { return true }
  else { return false }
}

Frame.prototype.isSpare = function() {
  if (this.score === 10 && this.rolls.length === 2) { return true }
  else { return false }
}

Frame.prototype.recordIfStrikeOrSpare = function() {
  if (this.isStrike()) { this.bonus = 2 }
  else if (this.isSpare()) { this.bonus = 1 }
}

Frame.prototype.isStandardFrameFinished = function() {
  if (this.isStrike() || this.rolls.length === 2) { return true }
  else { return false }
}

Frame.prototype.isFinalFrameFinished = function() {
  if ((this.rolls.length === 2 && this.score < 10) || this.rolls.length === 3) { return true }
  else { return false }
}