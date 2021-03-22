$( document ).ready(function() {
  class Game {
    constructor(balance, user) {
      this.user = null;
    }

    spin(){
      this.user ? this.updateGame() : this.createGame()
    }

    balanceAvailable(){
      return parseInt($(".balance p").text()) > 0
    }

    checkSession(){
      let self = this
      fetch('/session', {
        headers: {
          'Content-type': 'application/json'
        },
        contentType: "application/json",
        method: 'GET'
      }).then(function(response){
        return response.json()
      }).then(function(data){
        if(data.game){
          self.user = data.game.sessionID
          $(".balance p").text(data.game.balance);
        }
      })
    }

    createGame(){
      let self = this
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
      let that = this;
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
        if(that.balanceAvailable()){
          $('#playFancy').show();
        }else{
          $('#playFancy').hide();
        }
      });
    }

    resetGame(){
      if (!this.balanceAvailable()){
        console.log("entro")
        this.winGame("C")
      }
    }

    winGame(winningLetter){
      let that = this;
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
        if(this.balanceAvailable()){
          $('#playFancy').show();
        }
      });
    }
  }

  reset_button = document.getElementById('reset')


  const game = new Game();
  game.checkSession();

  reset_button.addEventListener('click', function(e){
    game.resetGame();
  })

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
        let winningLetter = $('ul li').eq(winLetter-1).text();
        game.winGame(winningLetter);
      }
  });

});
