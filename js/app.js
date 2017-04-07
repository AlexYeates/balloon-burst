var Game = Game || {};

Game.init = function init() {
  this.highScore   = 0;
  this.difficulty  = 1000;
  this.startScreen();
};

Game.startScreen = function startScreen() {
  this.board       = $('.board');
  this.startText   = $('<p class="starttext">Welcome to Balloon Burst. The aim of the game is to pop all of the balloons before they fly away. Miss one balloon and it\'s game over!</p>');
  this.startButton = $('<p class="startbutton">Start!</p>');
  this.board.append(this.startText);
  this.board.append(this.startButton);
  this.startButton.on('click', this.startButtonAction.bind(this));
};

Game.startButtonAction = function() {
  this.startText.empty();
  this.startButton.empty();
  this.score = 0;
  $('#score').text(`Score: `);
  this.startGame();
};

Game.startGame = function() {
  this.gameOver = false;
  this.timeOut  = setTimeout(Game.createBalloon, this.difficulty);
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
  Game.timeOut       = setTimeout(Game.createBalloon, Game.difficulty);
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
  }
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
  this.messageText = $('<p class="gameover">GAME OVER!</p>');
  this.board.append(this.messageText);
  if (Game.highScore < Game.score) {
    $('#high-score').text(`High Score: ${Game.score}`);
    Game.highScore = Game.score;
  }
};

Game.resetButton = function resetButton() {
  this.resetButton   = $('<p class="reset-button">Play again</p>');
  this.board.append(this.resetButton);
  this.resetButton.on('click', this.resetButtonAction.bind(this));
};

Game.resetButtonAction = function() {
  this.messageText.empty();
  this.resetButton.empty();
  this.startText.empty();
  this.startButton.empty();
  this.difficulty = 1000;
  this.startScreen();
};

$(Game.init.bind(Game));
