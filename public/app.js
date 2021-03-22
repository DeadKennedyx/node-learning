$( document ).ready(function() {
  class Game {
    constructor(balance, user) {
      this.user = null;
    }

    spin(){
      this.user ? this.updateGame() : this.createGame()
    }

    checkSession(){
      var self = this
      fetch('/session', {
        headers: {
          'Content-type': 'application/json'
        },
        contentType: "application/json",
        method: 'GET'
      }).then(function(response){
        return response.json()
      }).then(function(data){
        self.user = data.game.sessionID
        $(".balance p").text(data.game.balance);
      })
    }

    createGame(){
      var self = this
      fetch('/game', {
        headers: {
          'Content-type': 'application/json'
        },
        contentType: "application/json",
        method: 'POST'
      }).then(function(response){
        return response.json()
      }).then(function(data){
        self.user = data.game.sessionID
        $(".balance p").text(data.game.balance);
      })
    }

    updateGame(){
      fetch('/game', {
        headers: {
          'Content-type': 'application/json'
        },
        contentType: "application/json",
        method: 'PUT'
      }).then(function(response) {
          return response.json()
      }).then(function(data) {
        $(".balance p").text(data.game.balance);
      });
    }

    winGame(winningLetter){
      fetch('/game_win', {
        headers: {
          'Content-type': 'application/json'
        },
        contentType: "application/json",
        method: 'PUT',
        body: JSON.stringify({ winningLetter: winningLetter })
      }).then(function(response) {
          return response.json()
      }).then(function(data) {
        $(".balance p").text(data.game.balance);
      });
    }
  }

  spin_button = document.getElementById('spin')


  const game = new Game();
  game.checkSession();

  // spin_button.addEventListener('click', function(e){
  //   game.spin()
  // })

  $('.fancy .slot').jSlots({
      number : 3,
      winnerNumber : 1,
      spinner : '#playFancy',
      easing : 'easeOutSine',
      time : 1000,
      loops : 4,
      onStart : function() {
          $('.slot').removeClass('winner');
          game.spin()
      },
      onWin : function(winCount, winners, winLetter) {
        $.each(winners, function() {
          this.addClass('winner');
        });
        var winningLetter = $('ul li').eq(winLetter-1).text();
        game.winGame(winningLetter);
      }
  });

});
