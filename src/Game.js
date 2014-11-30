function ScoreCard(player) {
  this.player = player
  this.frames = []
  this.isFinished = false
}

ScoreCard.prototype.totalScore = function() {
  var total = 0
  for (i = 0; i < this.frames.length; i++) {
    var total = total + this.frames[i].score
  } return total }

ScoreCard.prototype.startFrame = function() {
  this.frames.push(new Frame())
}

ScoreCard.prototype.recordRoll = function(pins_hit) {

  if (this.frames.length === 0) { this.startFrame() }

  var currentFrame = this.frames[this.frames.length-1]
  var previousFrame = this.frames[this.frames.length-2]
  
  currentFrame.rolls.push(pins_hit)
  currentFrame.score += pins_hit

  if (this.frames.length > 1) {
    if (previousFrame.rolls[0] === 10 && currentFrame.rolls.length < 3) {
      previousFrame.score += pins_hit }
    else if (previousFrame.rolls.reduce(function(sum, n) { return sum + n }) === 10
    && currentFrame.rolls.length === 1) {
      previousFrame.score += pins_hit }
  }

  if (this.frames.length === 10 && currentFrame.rolls.length > 1) {
    if (currentFrame.rolls.reduce(function(sum, n) { return sum + n }) >= 10 
    && currentFrame.rolls.length < 3) { return }
    else { this.isFinished = true }
  }

  if (this.frames.length < 10) {
    if (currentFrame.rolls.length === 2 || pins_hit === 10) {
      this.startFrame() }
  }

}
