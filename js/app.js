$(() => {

  let missedBalloons = [];
  let slowBalloons = $('.slow-area')[Math.floor(Math.random()*$('.slow-area').length)];
  let mediumBalloons = $('.medium-area')[Math.floor(Math.random()*$('.medium-area').length)];
  let fastBalloons = $('.fast-area')[Math.floor(Math.random()*$('.fast-area').length)];
  const pop = $('li');

  //A mouseover event will take the balloon's ID away, therefore making it pop
  pop.mouseover(function() {
    $(this).removeAttr('id');
  });

  //These will generate the balloons so long as missedBalloons is less than 3.
  mediumAnimation();
  slowAnimation();


  //Maybe add the hour glass animation so the balloons will sway as they try to reach the top?
  function slowAnimation(){
    while (missedBalloons < 3) {
      slowBalloons.setAttribute('id', 'slow');
      var options = {
        duration: 1000,
        easing: 'linear'
      };
      $('.board')
      .find(slowBalloons)
      .animate({
        bottom: 300
      }, options);
      $.extend(true, {}, options, {
        complete: missedBalloons.push(slowBalloons)
      });
    }
  }

  function mediumAnimation() {
    while (missedBalloons < 3) {
      mediumBalloons.setAttribute('id', 'medium');
      var options = {
        duration: 800,
        easing: 'linear'
      };
      $('.board')
      .find(mediumBalloons)
      .animate({
        bottom: 400
      }, options);
      $.extend(true, {}, options, {
        complete: missedBalloons.push(mediumBalloons)
      });
    }
  }


  // function fastAnimation() {
  //   var options = {
  //     duration: 600,
  //     easing: 'linear'
  //   };
  //   $('.board')
  //   .find(fastBallons)
  //   .animate({
  //     bottom: 500
  //   }, options);
  //   $.extend(true, {}, options, {
  //     complete: missedBalloons.push(fastBallons)
  //   });
  // }
  // fastAnimation();

  console.log(missedBalloons);



  //A timer for 30 seconds will end the game

});


//Older verision before merging generateBalloons with the animations:

//An if statment will check whether missedBalloons has three ballons. If it doesn't balloons will be generated and be animated to go to the top of the board.

// function generateBalloons() {
//   // if (missedBalloons < 3) {
//     //while (missedBalloons < 3) {
//     //for (var i = 0; i < missedBalloons[3]; i++) {
//     slowBallons.setAttribute('id', 'slow');
//     mediumBallons.setAttribute('id', 'medium');
//     fastBallons.setAttribute('id', 'fast');
//   }

// function mediumAnimation() {
//   var options = {
//     duration: 800,
//     easing: 'linear'
//   };
//   $('.board')
//   .find(mediumBallons)
//   .animate({
//     bottom: 400
//   }, options);
//   $.extend(true, {}, options, {
//     complete: missedBalloons.push(mediumBallons)
//   });
// }
// mediumAnimation();
