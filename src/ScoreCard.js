function ScoreCard(player) {
  this.player = player
  this.frames = []
}

ScoreCard.prototype.currentFrame = function() {
  return this.frames[this.frames.length-1]
}

ScoreCard.prototype.enterRoll = function(pinsHit) {
  if (this.isGameFinished()) { return "Game over" }
  this.recordScore(pinsHit)
  if (this.frames.length < 10) { this.currentFrame().recordIfStrikeOrSpare() }
  if (this.frames.length > 1) { this.addPreviousFramesBonus(pinsHit) }
}

ScoreCard.prototype.checkIfNewFrame = function() {
  if (this.frames.length === 0 || this.currentFrame().isStandardFrameFinished()) {
    this.startFrame() }
}

ScoreCard.prototype.recordScore = function(pinsHit) {
  this.checkIfNewFrame()
  if (this.currentFrame().isInvalidNumber(pinsHit)) { return "Incorrect number" }
  this.currentFrame().rolls.push(pinsHit)
  this.currentFrame().score = parseInt(this.currentFrame().score) + parseInt(pinsHit)
}


ScoreCard.prototype.startFrame = function() {
  this.frames.push(new Frame())
}

ScoreCard.prototype.addPreviousFramesBonus = function(pinsHit) {
  for (var frame = 0; frame < this.frames.length-1; frame++) {
    if (this.frames[frame].bonus > 0) {
      this.frames[frame].score = parseInt(this.frames[frame].score) + parseInt(pinsHit)
      this.frames[frame].bonus = parseInt(this.frames[frame].bonus) - 1
    }
  }
}

ScoreCard.prototype.totalScore = function() {
  var total = 0
  for (var frame = 0; frame < this.frames.length; frame++) {
    var total = parseInt(total) + parseInt(this.frames[frame].score)
  } return total
}

ScoreCard.prototype.isGameFinished = function() {
  if (this.frames.length === 10 && this.currentFrame().isFinalFrameFinished()) { return true }
  else { return false }
}

ScoreCard.prototype.isGutterGame = function() {
  if (this.isGameFinished() && this.totalScore() === 0) { return true }
  else { return false }
}

ScoreCard.prototype.isPerfectGame = function() {
  if (this.isGameFinished() && this.totalScore() === 300) { return true }
  else { return false }
}

// Scorecard.prototype.isInvalidNumber = function(pinsHit) {
//   this.currentFrame().rolls.length === 1 && this.currentFrame().rolls[0] < 1 && pinsHit > (10 - this.currentFrame().score)))
// }

//   if (this.frames.length === 10) {
//     if (this.currentFrame().rolls.length === 1 ) { return false }
//     else if (this.currentFrame().score >= 10 && this.currentFrame().rolls.length < 3) { return false }
//     else { return true }
//   } else { return false }
// }

// ScoreCard.prototype.previousFrame = function() {
//   return this.frames[this.frames.length-2]
// }

// ScoreCard.prototype.beforePreviousFrame = function() {
//   return this.frames[this.frames.length-3]
// }

// Scorecard.prototype.addBonus = function() {
//   if (this.currentFrame().rolls[0] === 10 &&& this.currentFrame().rolls.length < 3) {
//     this.currentFrame().score = parseInt(this.current)
//   }
// }

// ScoreCard.prototype.checkBonus = function(pinsHit) {
//   if (this.previousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 3) {
//     this.addStrikeBonus(pinsHit) }
//   else if (this.previousFrame().score === 10 && this.currentFrame().rolls.length === 1) {
//     this.addSpareBonus(pinsHit) }
// }

// ScoreCard.prototype.addStrikeBonus = function(pinsHit) {
//   this.previousFrame().score = parseInt(this.previousFrame().score) + parseInt(pinsHit)
//   if (this.frames.length > 2 && this.beforePreviousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 2) {
//     this.beforePreviousFrame().score = parseInt(this.beforePreviousFrame().score) + parseInt(pinsHit) }
// }

// ScoreCard.prototype.addSpareBonus = function(pinsHit) {
//   this.previousFrame().score = parseInt(this.previousFrame().score) + parseInt(pinsHit)
// }