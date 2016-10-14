$( document ).ready(function() {
//--------Variables for the Game--------
    var colors = ['red', 'green', 'yellow', 'blue']; //
    simonSaid = []; //Contains randomly generated pattern for player to match
    playerResponse = []; //player responses to compare to what simon displayed
    var round = 0; //How far has the user gotten in the game
    var inProgress = false;
    //var selection = "";

//--------Start Round--------

  $('#start').on('click', function(){ //Creates new round for player

    var displayRound = round + 1;
    $('#round').text("Round: " + displayRound);
    inProgress = true; //sets flag so system knows round is in progress
    $('#userAlert').text("Round in Progress");

    for (i=0;i<round+1;i++){// creates color to put into array
      var num = randNum();
      while (num === undefined) {
        num = randNum();
      }
      simonSaid.push(colors[num]);
      console.log(colors[num]);
    }




    console.log("Here are the things to be flashed: " + simonSaid);
    for (let i=0;i<simonSaid.length;i++) { //Displays pattern for user to match




       (function (i) {
         var timer = 500 * (1+i);
         var selection = '#' + simonSaid[i]; // Tell the board what to flash
         console.log('This is what is about to be sent in: #' + simonSaid[i]);
         setTimeout(function eh(){
           console.log("The timer has been triggered and will now flash: "+ selection);
           $(selection).fadeOut(500).fadeIn(500)
         }, timer);
       })(i);
    }


  })

   function fader (div) {
       $(div).fadeOut(500).fadeIn(500);
   }

//--------Capture Player Selection--------

  $('.colorSquares').on('click', function () {

    if (inProgress === false) { //Makes sure a round is being played before a comparison happens
      return;
    }
    else {
      var selection = $(this).attr('id');
      console.log(selection);
      playerResponse.push(selection);

    }

    var nextRound; //declares variable to see if player should advance to the next round
    if (simonSaid.length === playerResponse.length) {
      nextRound = compare();
    }

    if (nextRound === false) {
      $('#userAlert').text("You LOSE!!!!!!!!!!");
      for (i=0; i <round+1;i++) {
        simonSaid.pop();
        playerResponse.pop();
      }
      round = 0;
    }
    else if (nextRound === true) {
      $('#userAlert').text("Winner!");
      for (i=0; i <round+1;i++) {
        simonSaid.pop();
        playerResponse.pop();
      }
      round ++;
    }
  })

//--------Compare user response to what Simon said--------

  function compare() {
    var winner = true;
    for (i=0;i<simonSaid.length;i++) {
      if (simonSaid[i] !== playerResponse[i]) {
        winner = false;
      }
    }
    return winner;
  }

//--------Generate Random Number--------

    function randNum() {
      return parseInt(Math.random() * (4 - 0) + 0);
    }
    // function iifePractice () {
    //   for (var i = 1; i <= 3; i++) {
    //     (function(index) {
    //        setTimeout(function() {
    //           console.log(index);
    //        }, 1000);
    //     })(i);
    //    }
    // }
    // iifePractice ();
}); //End of Doc Ready function
