
  var player = new Player();
  var scorecard = new ScoreCard(player);
  var gameStatus = new Message('#game_status');
  var tableData = new Message('#frames');
  var gameMessage = new Message('#messages');

  var startGame = function() {
    $('header').animate({top: '+=200px'}, 2000);
    $('#enter_name_form').on('submit', function(event) {
      event.preventDefault();
      var name = $('#enter_name').val();
      player.setName(name);
      showGameLayout(name);
    });
  };

  var showGameLayout = function(name) {
    gameStatus.addText(gameStatus.printGameStatus(scorecard));
    $('#enter_name_form').css("display", "none");
    $('#welcome_message').html(name + "'s Bowling Scorecard");
    $('#pin_request').show();
    $('#selection').css("display", "inline-block");
  };

  var numberAnimations = function() {
    $('#list li').mouseenter(function() { $(this).css("opacity", 1); });
    $('#list li').mouseleave(function() { $(this).css("opacity", 0.8); });
  };

  var clickNumber = function() {
    $('#list li').on('click', function(event) {
      event.preventDefault();
      var rollEntry = parseInt($(this).data('pick'));
      var enterRoll = scorecard.enterRoll(rollEntry);
      if(enterRoll != "Incorrect number") { hideUnavailableNumbers(rollEntry); }    
      showGameMessages();
    });
  };
  
  var hideUnavailableNumbers = function(rollEntry) {
    if(parseInt(scorecard.currentFrame().rolls.length) === 1 && parseInt(scorecard.currentFrame().rolls[0]) < 10) {
      for (var i = 0; i <= 10; i++) {
        var unavailable = ('#' + String(i));
        if ((parseInt(rollEntry) + i) > 10) {
          $(unavailable).unbind('mouseenter').unbind('mouseleave').css('opacity', 0.2);
        } 
      } 
    } else { showAvailableNumbers; }
  };

  var showAvailableNumbers = function() {
    $('#list li').css('opacity', 0.8).mouseenter(function() { 
      $(this).css('opacity', 1) }).mouseleave(function() {
        $(this).css('opacity', 0.8) });
  };

  var showGameMessages = function() {
    if (scorecard.isGameFinished()) { $('#pin_request').css("display", "none"); }
    gameStatus.addText(gameStatus.printGameStatus(scorecard));
    tableData.addText(tableData.printData(scorecard));
    gameMessage.addGameMessage(scorecard, gameMessage.printGameMessage(scorecard));
  };

$(document).ready(function(){
  
  startGame();
  numberAnimations();
  clickNumber();

});