$(() => {

  let missedBalloons = 0;
  let slowBallons = $('.slow-area')[Math.floor(Math.random()*$('.slow-area').length)];
  let mediumBallons = $('.medium-area')[Math.floor(Math.random()*$('.medium-area').length)];
  let fastBallons = $('.fast-area')[Math.floor(Math.random()*$('.fast-area').length)];
  const pop = $('li');

  //An if statment will check whether missedBalloons has three ballons. If it doesn't balloons will be generated and be animated to go to the top of the board.
  function generateBalloons() {
    if (missedBalloons < 3) {
      slowBallons.setAttribute('id', 'slow');
      //animate the ballon 
      //callback: complete (so it happens again)


      mediumBallons.setAttribute('id', 'medium');
      fastBallons.setAttribute('id', 'fast');
    }
  }
  generateBalloons();

  //missedBalloons will contain the number of balloons within the top row, which is checked through a for loop.



  //A mouseover event will take the balloon's ID away, therefore making it pop
  pop.mouseover(function() {
    $(this).removeAttr('id');
  });


  //A for loop will check the top to see if any balloons have been missed. If there are not any it will keep running generateBalloons

  //A timer for 30 seconds will end the game




});
