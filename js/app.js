$(() => {

  var Game = Game || {};

  Game.highScore = 0;
  Game.difficulty = 1000;

  Game.startScreen = function startScreen() {
    Game.board     = $('.board');
    Game.startText = $('<p class="starttext">Welcome to Balloon Burst. The aim of the game is to pop all of the balloons before they fly away. Miss one balloon and it\'s game over!</p>');
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
    Game.timeOut  = setTimeout(Game.createBalloon, Game.difficulty);
    $(document).on('mouseover', '.balloon', Game.balloonPop);
  };

  Game.balloonPop = function() {
    $(this).remove();
    $(this).addClass('clicked');
    new Audio('sounds/pop.wav').play();
    Game.score++;
    $('#score').text(`Score: ${Game.score}`);
    Game.levels();
  };

  Game.createBalloon = function createBalloon() {
    Game.timeOut = setTimeout(Game.createBalloon, Game.difficulty);
    Game.balloonHeight = 100;
    Game.balloon       = $('<div class="balloon animated swing"><img src=images/balloon.png></div>');
    Game.balloon.css('right', Game.randomStartingPosition());
    Game.board.append(Game.balloon);
    Game.balloon.animate({
      top: `-${Game.balloonHeight}px`,
      easing: 'linear'
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

  Game.levels = function levels() {
    if (Game.score % 25 === 0) {
      Game.difficulty = Game.difficulty - 100;
      //call second balloon which is the blunder
    }
  };

  Game.blunderBalloon = function blunderBalloon() {

  };

  Game.gameOverCheck = function() {
    if (Game.gameOver === true) {
      $(this).stop();
      $(this).remove();
      Game.score = 0;
      clearInterval(Game.timeOut);
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
      Game.difficulty = 1000;
      Game.startScreen();
    });
  };

  Game.startScreen();

});
