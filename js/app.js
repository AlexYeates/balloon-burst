$(() => {

  var Game = Game || {};

  Game.balloonHeight = 50;
  Game.score         = 1;
  Game.gameOver      = false;

  Game.startGame = function() {
    Game.interval = setInterval(Game.createBalloon, 500);
    $(document).on('mouseover', '.balloon', function() {
      $(this).remove();
      $(this).addClass('clicked');
      $('#score').text(`Score: ${Game.score++}`);
    });
  };
  
  Game.createBalloon = function createBalloon() {
    console.log(Game.balloon);
    Game.board    = $('.board');
    Game.balloon  = $('<div class="balloon"></div>');
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
          Game.gameOverMessage = $('<p>GAME OVER!</p>');
          Game.gameOverMessage.css({
            'text-align': 'left',
            'font-size': '80px',
            'margin': '40px'
          });
          $('').append(Game.gameOverMessage);
          $('#high-score').text(`High Score: ${Game.score++ -1}`);
        }
      }
    });
  };

  Game.gameOverCheck = function() {
    if (Game.gameOver === true) {
      $(this).stop();
      $(this).remove();
    }
  };

  Game.randomStartingPosition = function randomStartingPosition() {
    return Math.floor(Math.random() * 1000);
  };

  Game.startGame();

});
