function Frame() {};

Frame.prototype.rolls = {
  roll1: 0,
  roll2: 0,
  roll3: 0
};

Frame.prototype.recordScore = function(roll_number, score) {
  this.rolls[roll_number] = score;
};