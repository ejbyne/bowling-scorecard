function ScoreCard(player) {
  this.player = player
  this.frames = []
}

ScoreCard.prototype.enterRoll = function(pinsHit) {
  if (this.isFinished()) { return "Game over" }
  this.checkIfNewFrame()
  if (pinsHit < 0 || (this.currentFrame().rolls.length === 1 && this.currentFrame().rolls[0] < 10 && pinsHit > (10 - this.currentFrame().score))) { return "Incorrect number" }
  this.recordRoll(pinsHit)
  if (this.frames.length > 1) { this.checkBonus(pinsHit) }
}

ScoreCard.prototype.checkIfNewFrame = function() {
  if (this.frames.length === 0) {
    this.startFrame() }
  else if (this.frames.length < 10 && (this.currentFrame().rolls[0] === 10 || this.currentFrame().rolls.length === 2)) {
    this.startFrame() }
}

ScoreCard.prototype.recordRoll = function(pinsHit) {
  this.currentFrame().rolls.push(pinsHit)
  this.currentFrame().score = parseInt(this.currentFrame().score) + parseInt(pinsHit)
}

ScoreCard.prototype.startFrame = function() {
  this.frames.push(new Frame())
}

ScoreCard.prototype.currentFrame = function() {
  return this.frames[this.frames.length-1]
}

ScoreCard.prototype.previousFrame = function() {
  return this.frames[this.frames.length-2]
}

ScoreCard.prototype.beforePreviousFrame = function() {
  return this.frames[this.frames.length-3]
}

ScoreCard.prototype.totalScore = function() {
  var total = 0
  for (i = 0; i < this.frames.length; i++) {
    var total = parseInt(total) + parseInt(this.frames[i].score) } return total
}

ScoreCard.prototype.checkBonus = function(pinsHit) {
  if (this.previousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 3) {
    this.addStrikeBonus(pinsHit) }
  else if (this.previousFrame().score === 10 && this.currentFrame().rolls.length === 1) {
    this.addSpareBonus(pinsHit) }
}

ScoreCard.prototype.addStrikeBonus = function(pinsHit) {
  this.previousFrame().score = parseInt(this.previousFrame().score) + parseInt(pinsHit)
  if (this.frames.length > 2 && this.beforePreviousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 2) {
    this.beforePreviousFrame().score = parseInt(this.beforePreviousFrame().score) + parseInt(pinsHit) }
}

ScoreCard.prototype.addSpareBonus = function(pinsHit) {
  this.previousFrame().score = parseInt(this.previousFrame().score) + parseInt(pinsHit)
}

ScoreCard.prototype.isFinished = function() {
  if (this.frames.length === 10) {
    if (this.currentFrame().rolls.length === 1 ) { return false }
    else if (this.currentFrame().score >= 10 && this.currentFrame().rolls.length < 3) { return false }
    else { return true }
  } else { return false }
}

ScoreCard.prototype.gutterGame = function() {
  if (this.isFinished() && this.totalScore() === 0)
    { return true } else { return false }
}

ScoreCard.prototype.perfectGame = function() {
  if (this.isFinished() && this.totalScore() === 300)
  { return true } else { return false }
}