$(() => {

  let missedBalloons = 0;
  let slowBallons = $('.slow-area')[Math.floor(Math.random()*$('.slow-area').length)];
  let mediumBallons = $('.medium-area')[Math.floor(Math.random()*$('.medium-area').length)];
  let fastBallons = $('.fast-area')[Math.floor(Math.random()*$('.fast-area').length)];
  const pop = $('li');

  //An if statment will check whether missedBalloons has three ballons. If it doesn't balloons will be generated and be animated to go to the top of the board.

  //Once the animations work and +1 to missedBalloons, add a loop to this function to check if missedBalloons is at 3, and if not to keep generating balloons while the countdown lasts
  function generateBalloons() {
    if (missedBalloons < 3) {
      slowBallons.setAttribute('id', 'slow');
      console.log(slowBallons);
      mediumBallons.setAttribute('id', 'medium');
      fastBallons.setAttribute('id', 'fast');
    }
  }
  generateBalloons();

  function slowAnimation() {
    var options = {
      duration: 1000,
      easing: 'linear'
    };
    //animate the balloons
    $('.board')
    .find(slowBallons)
    .animate({
      left: 280,
      top: 0
    }, options);
    $.extend(true, {}, options, {
      complete: missedBalloons += 1 }
    );
    console.log(missedBalloons);
  }
  slowAnimation();

  // options
  //
  // generateBalloons();





  //add a callback condition saying if it reaches the finish line +1 to missedBalloons?



  //A mouseover event will take the balloon's ID away, therefore making it pop
  pop.mouseover(function() {
    $(this).removeAttr('id');
  });

  //A timer for 30 seconds will end the game

});
