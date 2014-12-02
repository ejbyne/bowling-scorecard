$(document).ready(function(){

  var player = new Player()
  var scorecard = new ScoreCard(player)
  var gameStatus = new Message('#game_status')
  var tableData = new Message('#frames')
  var gameMessage = new Message('#messages')

  $('#name_submit').on('click', function(event) {
    event.preventDefault()
    var name = $('#enter_name').val()
    player.setName(name)
    gameStatus.addText(gameStatus.printGameStatus(scorecard))
    $('#enter_name_form').css("display", "none")
    $('#welcome_message').html(name + "'s Bowling Scorecard")
    $('#pin_request').show()
    $('#selection').css("display", "inline-block")
  })

  $('#list li').mouseenter(function() {
    $(this).css("opacity", 1) })
  $('#list li').mouseleave(function() {
    $(this).css("opacity", 0.8) })

  $('#list li').on('click', function(event) {
    event.preventDefault()
    var rollEntry = parseInt($(this).data('pick'))
    var enterRoll = scorecard.enterRoll(rollEntry)

    if(enterRoll != "Incorrect number") {
      if(parseInt(scorecard.currentFrame().rolls.length) === 1
      && parseInt(scorecard.currentFrame().rolls[0]) < 10) {
        for (var i = 0; i <= 10; i++) {
          var unavailable = ('#' + String(i));
          if ((parseInt(rollEntry) + i) > 10) {
            $(unavailable).unbind('mouseenter');
            $(unavailable).unbind('mouseleave');
            $(unavailable).css('opacity', 0.2);
          }
        } 
      }
      else {
        $('#list li').css('opacity', 0.8);
        $('#list li').mouseenter(function() {
          $(this).css('opacity', 1) });
        $('#list li').mouseleave(function() {
          $(this).css('opacity', 0.8) });
      }

    }
    if(scorecard.isFinished()) {
      $('#pin_request').css("display", "none")
    }
    gameStatus.addText(gameStatus.printGameStatus(scorecard))
    tableData.addText(tableData.printData(scorecard))
    gameMessage.addText(gameMessage.printGameMessage(scorecard))
  })

})