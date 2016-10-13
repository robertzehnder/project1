$( document ).ready(function() {
//--------Variables for the Game--------
    var colors = ['red', 'green', 'yellow', 'blue']; //
    var simonSaid = []; //Contains randomly generated pattern for player to match
    var playerResponse = []; //player responses to compare to what simon displayed
    var round = 0; //How far has the user gotten in the game
    var inProgress = false;

//--------Start Round--------
  $('#start').on('click', function(){ //Creates new round for player

    var displayRound = round + 1;
    $('.round').text("Round: " + displayRound);
    inProgress = true; //sets flag so system knows round is in progress
    $('#userAlert').text("Round in Progress");

    for (i=0;i<round+1;i++){// creates color to put into array
      var num = randNum();
      while (num === undefined) {
        num = randNum();
      }
      simonSaid.push(colors[randNum()]);
    }

    for (i=0;i<simonSaid.length;i++) { //Displays pattern for user to match
      var selection = '#' + simonSaid[i];
      $(selection).css('opacity', '1');
      setTimeout(function() { //delays turning off highlight
          $(selection).css('opacity', '.3'); // Turns color faded again
      }, 500);
    }
  })

//--------Capture Player Selection--------

  $('.colorSquares').on('click', function () {

    if (inProgress === false) { //Makes sure a round is being played before a comparison happens
      return;
    }
    else {
      var selection = $(this).attr('id');
      console.log(selection);
      playerResponse.push(selection);
      // console.log('works'); --- confirmed
    }

    var nextRound; //declares variable to see if player should advance to the next round
    if (simonSaid.length === playerResponse.length) {
      nextRound = compare();
    }

    if (nextRound === false) {
      $('#userAlert').text("You LOSE!!!!!!!!!!");
      simonSaid = [];
      playerResponse = [];
      $(selection).css('opacity', '.3'); // Turns color faded again
      round = 0;
    }
    else if (nextRound === true) {
      $('#userAlert').text("Winner!");
      simonSaid = [];
      playerResponse = [];
      $(selection).css('opacity', '.3'); // Turns color faded again
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
      return parseInt(Math.random() * (3 - 0) + 0);
    }



}); //End of Doc Ready function
