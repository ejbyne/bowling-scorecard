function Game(player, scorecard) {
  this.player = player;
  this.scoreCard = scorecard;
  // this.scoreCard = scorecard;
  // this.turn = this.player1;
};

// Game.prototype.switchTurns = function() {
//   if (this.turn === this.player1) {
//     this.turn = this.player2
//   } else { this.turn = this.player1 };
// };

Game.prototype.startFrame = function() {
  if (this.scoreCard.length === 10) return null
  this.scoreCard.shift(new Frame())
};

Game.prototype.roll = function(frame, roll_number, pins_struck) {
  frame[('roll' + roll_number)] = pins_struck;
};

// function ScoreCard(player) {
//   this.player = player;
//   this.record = [];
// };


