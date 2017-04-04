$(() => {

  var Game = Game || {};

  Game.balloonHeight = 50;
  Game.highScore     = 0;

  Game.startScreen = function startScreen() {
    Game.board       = $('.board');
    Game.startText   = $('<p class="starttext">Welcome to Pop Game. The aim of the game is to pop all of the balloons before they fly away. Miss one balloon and it\'s game over!</p>');
    Game.startButton = $('<p class="startbutton">Start!</p>');
    Game.board.append(Game.startText);
    Game.board.append(Game.startButton);
    Game.startButton.on('click', function() {
      Game.startText.empty();
      Game.startButton.empty();
      Game.score = 0;
      $('#score').text(`Score: `);
      Game.startGame();
    });
  };

  Game.startGame = function() {
    Game.gameOver = false;
    Game.interval = Game.levels();// setInterval(Game.createBalloon, 500); //need to swap the in the interval function
    $(document).on('mouseover', '.balloon', Game.balloonPop);
  };

  //This to do an if..else on how short the intervals are based on the score
  Game.levels = function levels() {
    if (Game.score % 10 === 0) {
      setInterval(Game.createBalloon, 100);
    } else {
      setInterval(Game.createBalloon, 500);
    }
  };

  Game.balloonPop = function() {
    $(this).remove();
    $(this).addClass('clicked');
    Game.score++;
    $('#score').text(`Score: ${Game.score}`);
  };

  Game.createBalloon = function createBalloon() {
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
      clearInterval(Game.interval);
      Game.score = 0;
      $(document).off('mouseover', '.balloon', Game.balloonPop);
    }
  };

  Game.gameOverMessage = function gameOverMessage() {
    Game.messageText = $('<p class="gameover">GAME OVER!</p>');
    Game.board.append(Game.messageText);
    if (Game.highScore < Game.score) {
      $('#high-score').text(`High Score: ${Game.score}`);
      Game.highScore = Game.score;
    }
  };

  Game.resetButton = function resetButton() {
    Game.resetText = $('<p class="reset-button">Play again</p>');
    Game.board.append(Game.resetText);
    Game.resetText.on('click', function() {
      Game.messageText.empty();
      Game.resetText.empty();
      Game.startText.empty();
      Game.startButton.empty();
      Game.startScreen();
    });
  };

  Game.startScreen();

});
