function ScoreCard(player) {
  this.player = player
  this.frames = []
  this.isFinished = false
}

ScoreCard.prototype.enterRoll = function(pinsHit) {
  if (this.isFinished) { return "Game over" }
  this.recordRoll(pinsHit)
  if (this.frames.length > 1) { this.checkBonus(pinsHit) }
  this.checkIfFinished()
  this.checkIfNewFrame(pinsHit)
}

ScoreCard.prototype.recordRoll = function(pinsHit) {
  if (this.frames.length === 0) { this.startFrame() }
  this.currentFrame().rolls.push(pinsHit)
  this.currentFrame().score += pinsHit
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
    var total = total + this.frames[i].score } return total
}

ScoreCard.prototype.checkBonus = function(pinsHit) {
  if (this.previousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 3) {
    this.addStrikeBonus(pinsHit) }
  else if (this.previousFrame().rolls.reduce(function(sum, n) { return sum + n }) === 10 && this.currentFrame().rolls.length === 1) {
    this.addSpareBonus(pinsHit) }
}

ScoreCard.prototype.addStrikeBonus = function(pinsHit) {
  this.previousFrame().score += pinsHit
  if (this.frames.length > 2 && this.beforePreviousFrame().rolls[0] === 10 && this.currentFrame().rolls.length < 2) {
    this.beforePreviousFrame().score += pinsHit }
}

ScoreCard.prototype.addSpareBonus = function(pinsHit) {
  this.previousFrame().score += pinsHit
}

ScoreCard.prototype.checkIfFinished = function() {
  if (this.frames.length === 10 && this.currentFrame().rolls.length > 1) {
    if (this.currentFrame().rolls.reduce(function(sum, n) { return sum + n }) >= 10 
    && this.currentFrame().rolls.length < 3) { return }
    else { this.isFinished = true }
  }
}

ScoreCard.prototype.checkIfNewFrame = function(pinsHit) {
  if (this.frames.length < 10) {
    if (this.currentFrame().rolls.length === 2 || pinsHit === 10) {
      this.startFrame() }
  }  
}