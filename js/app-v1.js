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

  //Generate the balloons so long as missedBalloons is less than 3.
  while (missedBalloons < 3) {
    animation();
  }

  //Maybe add the hour glass animation so the balloons will sway as they try to reach the top?
  function animation(){
    slowBalloons.setAttribute('id', 'slow');
    const slow = {
      duration: 1000,
      easing: 'linear'
    };
    $('.board')
    .find(slowBalloons)
    .animate({
      bottom: 300
    }, slow);
    $.extend(true, {}, slow, {
      complete: missedBalloons.push(mediumBalloons)
    });
    mediumBalloons.setAttribute('id', 'medium');
    const medium = {
      duration: 800,
      easing: 'linear'
    };
    $('.board')
    .find(mediumBalloons)
    .animate({
      bottom: 400
    }, medium);
    $.extend(true, {}, medium, {
      complete: missedBalloons.push(mediumBalloons)
    });
    fastBalloons.setAttribute('id', 'fast');
    const fast = {
      duration: 600,
      easing: 'linear'
    };
    $('.board')
    .find(fastBalloons)
    .animate({
      bottom: 500
    }, fast);
    $.extend(true, {}, fast, {
      complete: missedBalloons.push(fastBalloons)
    });
  }
  console.log(missedBalloons);

  //A timer for 30 seconds will end the game.

  //levels up to 10 getting harder as they go.
});

//Trying to fix the missedBalloon tracker:

//- call the animation
// animation();
//
// function animation() {
// slowBalloons.setAttribute('id', 'slow');
//   slowBalloons.animate([
//     {bottom: 300 }
//   ], {
//     duration: 1000,
//     easing: linear
//   });
//   missed();
//
//
//   }



// - at the end of the animation, run a function checking whether it is at the top
// - if it is, push into the missedBalloon array its element
// - if it isn't, callback the animation


//Using position of the balloon to push to the missedBalloons array or not.
 // function missed() {
 //   if (slowBalloons === {top: 0, left: 0}) {
 //     missedBalloons.push(slowBalloons);
 // }





//Older verision before merging generateBalloons with the animations, and merging the animations into one function:

//An if statment will check whether missedBalloons has three ballons. If it doesn't balloons will be generated and be animated to go to the top of the board.

// function generateBalloons() {
//   // if (missedBalloons < 3) {
//     //while (missedBalloons < 3) {
//     //for (var i = 0; i < missedBalloons[3]; i++) {
//     slowBallons.setAttribute('id', 'slow');
//     mediumBallons.setAttribute('id', 'medium');
//     fastBallons.setAttribute('id', 'fast');
//   }

// function slowAnimation() {
//   var options = {
//     duration: 1000,
//     easing: 'linear'
//   };
//   $('.board')
//   .find(slowBallons)
//   .animate({
//     bottom: 300
//   }, options);
//   $.extend(true, {}, options, {
//     complete: missedBalloons.push(slowBallons)
//   });
// }
// slowAnimation();
