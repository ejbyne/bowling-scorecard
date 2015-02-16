var player = new Player();
var scorecard = new ScoreCard(player);
var frameData = new Message('#frame_data');
var tableData = new Message('#table_data');
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
  frameData.addGameUpdate(scorecard, 'frameData');
  $('#enter_name_form').css("display", "none");
  $('#welcome_message').html(name + "'s Bowling Scorecard");
  $('#pin_request').show();
  $('#selection').css("display", "inline-block");
};

var startNumberAnimations = function() {
  $('#list li').mouseenter(function() { $(this).css("opacity", 1); });
  $('#list li').mouseleave(function() { $(this).css("opacity", 0.8); });
};

var waitForNumberClick = function() {
  $('#list li').on('click', function(event) {
    event.preventDefault();
    var rollEntry = parseInt($(this).data('pick'));
    var enterRoll = scorecard.enterRoll(rollEntry);
    if (enterRoll !== "Incorrect number") {
      showNumbers(rollEntry);
      showGameMessages();
    }
  });
};

var showNumbers = function(rollEntry) {
  if (parseInt(scorecard.currentFrame().rolls.length) === 1 &&
    parseInt(scorecard.currentFrame().rolls[0]) < 10) {
    hideUnavailableNumbers(rollEntry);
  }
  else {
    showAvailableNumbers();
  }
};

var hideUnavailableNumbers = function(rollEntry) {
  for (var i = 0; i <= 10; i++) {
    var unavailable = ('#' + String(i));
    if (parseInt(rollEntry) + parseInt(i) > 10) {
      $(unavailable).unbind('mouseenter').unbind('mouseleave').css('opacity', 0.2);
    }
  }
};

var showAvailableNumbers = function() {
  $('#list li').css('opacity', 0.8).mouseenter(function() { 
    $(this).css('opacity', 1); }).mouseleave(function() {
      $(this).css('opacity', 0.8); });
};

var showGameMessages = function() {
  gameMessage.addGameMessage(scorecard);
  tableData.addGameUpdate(scorecard, 'tableData');
  frameData.addGameUpdate(scorecard, 'frameData');
  if (scorecard.isGameFinished()) {
    $('#pin_request').css("display", "none");
  }
};

$(document).ready(function(){
  startGame();
  startNumberAnimations();
  waitForNumberClick();
});
