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
  this.frames[this.frames.length-1].rolls.push(pins_hit)
  this.frames[this.frames.length-1].score += pins_hit

  if (this.frames.length > 1) {
    if (this.frames[this.frames.length-2].rolls.reduce(function(sum, n) { return sum + n }) === 10
    && this.frames[this.frames.length-1].rolls.length === 1) {
      this.frames[this.frames.length-2].score += pins_hit
    }
  }

  if (this.frames.length < 10) {
    if (this.frames[this.frames.length-1].rolls.length === 2
    || pins_hit === 10) {
      this.frames.push(new Frame())
    }
  }

  if (this.frames.length === 10) {
    if ((this.frames[9].rolls.reduce(function(sum, n) { return sum + n })) >= 10
    && this.frames[9].rolls.length < 3) {
      return
    }
    else if (this.frames[9].rolls.length < 2) {
      return
    }
    else {
      this.isFinished = true
    }
  }
}





