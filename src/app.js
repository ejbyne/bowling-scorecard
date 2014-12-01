$(document).ready(function(){

  $('#name_submit').on('click', function(event) {
    event.preventDefault();
    $('#enter_name_form').css("display", "none");
    $('#enter_roll_form').show();
    $('#selection').css("display", "inline-block");
    
    var name = $('#enter_name').val();
    var player = new Player(name);
    var scorecard = new ScoreCard(player);
    $('h1').html(name + "'s Bowling Scorecard")
    
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

    $('.numbers').mouseenter(function() {
      $(this).fadeTo('fast', 1)
    })

    $('.numbers').mouseleave(function() {
      $(this).fadeTo('fast', 0.5)
    })

    $('#roll_submit').on('click', function(event) {
      event.preventDefault();
      var rollEntry = parseInt($('#enter_roll').val());
      scorecard.enterRoll(rollEntry);
      var tableData = printData(scorecard);
      $('#frames').html(tableData);

      if(scorecard.isFinished() === false) {
        if(scorecard.currentFrame().rolls[0] === 10) {
          $('#messages').html('Strike!') }
        else if (scorecard.currentFrame().score === 10) {
          $('#messages').html('Spare!') }
        else { $('#messages').html('') }
      }

      if(scorecard.isFinished()) {
        $('#messages').html('<p>Game Over</p>');
        if(scorecard.gutterGame()) {
          $('<p>Gutter Game!</p>').appendTo('#messages'); }
        if(scorecard.perfectGame()) {
          $('<p>Perfect Game!</p>').appendTo('#messages'); }
      }
    })
  })
})