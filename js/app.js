var Game = Game || {};

Game.init = function init() {

  this.highScore       = 0;


  this.board           = $('.board');
  this.startText       = $('<p class="starttext">Welcome to Balloon Burst. The aim of the game is to pop all of the balloons before they fly away. Miss one balloon and it\'s game over!</p>');
  this.startButtonText = $('<p class="startbutton">Start!</p>');
  this.balloon         = $('<div class="balloon animated swing"><img src=images/balloon.png></div>');
  this.messageText     = $('<p class="gameover">GAME OVER!</p>');
  this.resetText       = $('<p class="reset-button">Play again</p>');

  this.startButtonText.on('click', this.startButton.bind(this));
  $(document).on('mouseover', '.balloon', this.balloonPop.bind(this));
  this.resetText.on('click', this.resetButton.bind(this));

  this.startScreen();
};

Game.startScreen = function startScreen() {
  this.difficulty = 1000;
  this.board.append(this.startText);
  this.board.append(this.startButtonText);
};

Game.startButton = function() {
  this.startText.empty();
  this.startButtonText.empty();
  this.score = 0;
  $('#score').text(`Score: `);
  this.startGame();
};

Game.startGame = function() {
  this.gameOver = false;
  this.timeOut  = setTimeout(this.createBalloon, this.difficulty);
};

Game.balloonPop = function() {
  $(this).remove();
  $(this).addClass('clicked');
  new Audio('sounds/pop.wav').play();
  this.score++;
  $('#score').text(`Score: ${this.score}`);
  this.levels();
};

Game.createBalloon = function createBalloon() {
  this.balloonHeight   = 100;
  this.timeOut = setTimeout(Game.createBalloon, Game.difficulty);
  this.balloon.css('right', this.randomStartingPosition());
  this.board.append(this.balloon);
  this.balloon.animate({
    top: `-${this.balloonHeight}px`,
    easing: 'linear'
  }, {
    duration: 2000,
    step: this.gameOverCheck,
    complete: function() {
      if (!($(this).hasClass('clicked'))) {
        this.gameOver = true;
        this.gameOverMessage();
        this.reset();
      }
    }
  });
};

Game.randomStartingPosition = function randomStartingPosition() {
  return Math.floor(Math.random() * 1000);
};

Game.levels = function levels() {
  if (this.score % 25 === 0) {
    this.difficulty = this.difficulty - 100;
  }
};

Game.gameOverCheck = function() {
  if (this.gameOver === true) {
    $(this).stop();
    $(this).remove();
    this.score = 0;
    clearInterval(this.timeOut);
    $(document).off('mouseover', '.balloon', this.balloonPop);
  }
};

Game.gameOverMessage = function gameOverMessage() {
  this.board.append(this.messageText);
  if (this.highScore < this.score) {
    $('#high-score').text(`High Score: ${this.score}`);
    this.highScore = this.score;
  }
};

Game.reset = function reset() {
  this.board.append(this.resetText);
};

Game.resetButton = function() {
  this.messageText.empty();
  this.resetText.empty();
  this.startText.empty();
  this.startButton.empty();
  this.difficulty = 1000;
  this.startScreen();
};

$(Game.init.bind(Game));
