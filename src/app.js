$(document).ready(function(){

  $('#name_submit').on('click', function(event) {

    event.preventDefault();
    var name = $('#enter_name').val()
    var player = new Player(name)
    var scorecard = new ScoreCard(player)
    var gameStatus = new Message('#game_status')
    var tableData = new Message('#frames')
    var gameMessage = new Message('#messages')

    $('#enter_name_form').css("display", "none");
    $('#welcome_message').html(name + "'s Bowling Scorecard")
    $('#pin_request').show();
    $('#selection').css("display", "inline-block");
    gameStatus.addText(gameStatus.printGameStatus(scorecard))
    
    $('#selection li').mouseenter(function() {
      $(this).fadeTo('fast', 1) })

    $('#selection li').mouseleave(function() {
      $(this).fadeTo('fast', 0.8) })

    $('#selection li').on('click', function(event) {
      event.preventDefault();
      var rollEntry = parseInt($(this).data('pick'));
      scorecard.enterRoll(rollEntry);
      gameStatus.addText(gameStatus.printGameStatus(scorecard))
      tableData.addText(tableData.printData(scorecard))
      gameMessage.addText(gameMessage.printGameMessage(scorecard))
    })

  })

})