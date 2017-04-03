const balloonWidth  = 50;
const balloonHeight = 50;
let score           = 0;

$(() => {
  setInterval(createBalloon, 500);
  $(document).on('mouseover', '.balloon', function() {
    $(this).remove();
    score++;
    console.log(score);
  });
});

function createBalloon() {
  const $body    = $('body');
  const $balloon = $('<div class="balloon"></div>');
  $balloon.css('right', randomStartingPosition());
  $body.append($balloon);
  $balloon.animate({
    top: `-${balloonHeight}px`
  }, 1500, function() {
    console.log('hit');
  });
}

function randomStartingPosition() {
  return Math.floor(Math.random() * $(document).width() - balloonWidth);
}
