$(() => {

  var Game = Game || {};

  Game.balloonHeight = 50;
  Game.score         = 1;
  Game.highScore     = 0;

  //start button to fix the game running over itself?
  //create text and with button and append it to board
  //make a button within that text
  //add on click to the button
  //the onclick will clear the start button and call startGame

  Game.startButton = function startButton() {

  };

  Game.startGame = function() {
    Game.gameOver = false;
    Game.interval = setInterval(Game.createBalloon, 500);
    $(document).on('mouseover', '.balloon', function() {
      $(this).remove();
      $(this).addClass('clicked');
      $('#score').text(`Score: ${Game.score++}`);
      console.log('running');
    });
  };

  Game.createBalloon = function createBalloon() {
    Game.board    = $('.board');
    Game.balloon  = $('<div class="balloon"><img src=images/balloon.png></div>');
    Game.balloon.css('right', Game.randomStartingPosition());
    Game.board.append(Game.balloon);
    Game.balloon.animate({
      top: `-${Game.balloonHeight}px`
    }, {
      duration: 2000,
      step: Game.gameOverCheck,
      complete: function() {
        if (!($(this).hasClass('clicked'))) {
          Game.gameOver = true;
          Game.gameOverMessage();
          Game.resetButton();
        }
      }
    });
  };

  Game.randomStartingPosition = function randomStartingPosition() {
    return Math.floor(Math.random() * 1000);
  };

  Game.gameOverCheck = function() {
    if (Game.gameOver === true) {
      $(this).stop();
      $(this).remove();
    }
  };

  Game.gameOverMessage = function gameOverMessage() {
    Game.messageText = $('<p class="gameover">GAME OVER!</p>');
    Game.board.append(Game.messageText);
    if (Game.highScore < Game.score) {
      $('#high-score').text(`High Score: ${Game.score++ -1}`);
      Game.highScore = Game.score;
    }
  };

  // The reset button makes it go too fast and counts up in 2s -> these issues are probably related to the game running twice within itself. On each reset it runs again.
  Game.resetButton = function resetButton() {
    Game.resetText = $('<p class="button">Play again</p>');
    Game.board.append(Game.resetText);
    Game.resetText.on('click', function() {
      Game.score = 0;
      $('#score').text(`Score: `);
      Game.messageText.empty();
      Game.resetText.empty();
      // Game.startGame();
      Game.startButton();
    });
  };

  // Game.startGame();
  // in leiu of startgame here, have start button
  Game.startButton();


});
