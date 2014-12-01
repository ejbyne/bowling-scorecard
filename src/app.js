$(document).ready(function(){

  $('#name_submit').on('click', function(event) {
    event.preventDefault();
    $('#enter_name_form').css("display", "none");
    $('#selection').css("display", "inline-block");
    
    var name = $('#enter_name').val();
    var player = new Player(name);
    var scorecard = new ScoreCard(player);
    $('#welcome_message').html(name + "'s Bowling Scorecard")
    $('#game_status').html('Frame 1 Roll 1')
    $('#pin_request').html('Please enter pins hit:')
    
    var printData = function(scorecard) {
      var data = '<tr><th>Frame</th><th>Roll</th><th>Pins</th><th>Frame score</th><th>Total score</th></tr>';
      for (var frame = 0; frame < scorecard.frames.length; frame++) {
        for (var roll = 0; roll < scorecard.frames[frame].rolls.length; roll++) { 
          if (roll === scorecard.frames[frame].rolls.length-1) { var frameScore = scorecard.frames[frame].score
          } else { var frameScore = '' }
          if (frame === scorecard.frames.length-1 && roll === scorecard.frames[frame].rolls.length-1 ) { var totalScore = scorecard.totalScore()
          } else { var totalScore = '' }
          var data = data + ('<tr><td>' + (frame + 1) + '</td><td>' + (roll + 1) + '</td><td>' + (scorecard.frames[frame].rolls[roll]) + '</td><td>' + frameScore + '</td><td>' + totalScore + '</td></tr>');
        }
      }
      return data;
    }

    var printGameStatus = function(scorecard) {
      if (scorecard.isFinished()) { return 'Game Over' }
      else {
        var data = 'Frame '
        if (scorecard.currentFrame().rolls.length === 2 && scorecard.frames.length < 10) {
          var frame = parseInt(scorecard.frames.length + 1)
          var roll = 1
        } else {
          var  frame = scorecard.frames.length
          var roll = parseInt(scorecard.currentFrame().rolls.length + 1)
        }
        return data = data + frame + ' Roll ' + roll
      }
    }

    $('#selection li').mouseenter(function() {
      $(this).fadeTo('fast', 1)
    })

    $('#selection li').mouseleave(function() {
      $(this).fadeTo('fast', 0.8)
    })

    $('#selection li').on('click', function(event) {
      event.preventDefault();
      var rollEntry = parseInt($(this).data('pick'));
      scorecard.enterRoll(rollEntry);
      var tableData = printData(scorecard);
      var gameStatus = printGameStatus(scorecard);
      $('#game_status').html(gameStatus);
      $('#frames').html(tableData);

      if(scorecard.isFinished() === false) {
        if(scorecard.currentFrame().rolls[0] === 10) {
          $('#messages').html('Strike!') }
        else if (scorecard.currentFrame().score === 10) {
          $('#messages').html('Spare!') }
        else { $('#messages').html('') }
      }

      if(scorecard.isFinished()) {
        if(scorecard.gutterGame()) {
          $('#messages').html('Gutter Game!') }
        else if(scorecard.perfectGame()) {
          $('#messages').html('Perfect Game!') }
        else { $('#messages').html('Nice Try!') }
      }
    })
  })
})