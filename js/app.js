$(() => {

  let missedBalloons = 0;
  let slowBallons = $('.slow-area')[Math.floor(Math.random()*$('.slow-area').length)];
  let mediumBallons = $('.medium-area')[Math.floor(Math.random()*$('.medium-area').length)];
  let fastBallons = $('.fast-area')[Math.floor(Math.random()*$('.fast-area').length)];
  const pop = $('li');

  //An if statment will check whether missedBalloons has three ballons. If it doesn't balloons will be generated and be animated to go to the top of the board.

  //Once the animations work and +1 to missedBalloons, add a loop to this function to check if missedBalloons is at 3, and if not to keep generating balloons while the countdown lasts
  function generateBalloons() {
    // if (missedBalloons < 3) {
    for (missedBalloons = 0; missedBalloons < 3; missedBalloons++) {
      slowBallons.setAttribute('id', 'slow');
      mediumBallons.setAttribute('id', 'medium');
      fastBallons.setAttribute('id', 'fast');
    }
  }
  generateBalloons();


//Maybe add the hour glass animation so the balloons will sway as they try to reach the top?
  function slowAnimation() {
    var options = {
      duration: 1000,
      easing: 'linear'
    };
    $('.board')
    .find(slowBallons)
    .animate({
      bottom: 300
    }, options);
    $.extend(true, {}, options, {
      complete: missedBalloons + 1 }
    );
  }
  slowAnimation();

  function mediumAnimation() {
    var options = {
      duration: 800,
      easing: 'linear'
    };
    $('.board')
    .find(mediumBallons)
    .animate({
      bottom: 400
    }, options);
    $.extend(true, {}, options, {
      done: missedBalloons + 1 }
    );
  }
  mediumAnimation();

  function fastAnimation() {
    var options = {
      duration: 600,
      easing: 'linear'
    };
    $('.board')
    .find(fastBallons)
    .animate({
      bottom: 500
    }, options);
    $.extend(true, {}, options, {
      done: missedBalloons + 1 }
    );
  }
  fastAnimation();

  console.log(missedBalloons);

  //A mouseover event will take the balloon's ID away, therefore making it pop
  pop.mouseover(function() {
    $(this).removeAttr('id');
  });

  //A timer for 30 seconds will end the game

});
