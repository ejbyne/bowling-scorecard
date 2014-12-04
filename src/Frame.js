function Frame() {
  this.rolls = []
  this.score = 0
  this.bonus = 0
}

Frame.protocol.isInvalidNumber = function(pinsHit) {
  this.rolls.length === 1 && !this.isStrike() && pinsHit > (10 - this.score)
}

Frame.protocol.isStrike = function() {
  this.rolls[0] === 10
}

Frame.protocol.isSpare = function() {
  this.score === 10 && this.rolls.length === 2
}

Frame.protocol.recordIfStrikeOrSpare = function() {
  if (this.isStrike()) { this.bonus = 2 }
  else if (this.isSpare()) { this.bonus = 1 }
}

Frame.protocol.isStandardFrameFinished = function() {
  this.isStrike() || this.rolls.length === 2
}

Frame.protocol.isFinalFrameFinished = function() {
 (this.rolls.length === 2 && this.score < 10) || this.rolls.length === 3
}