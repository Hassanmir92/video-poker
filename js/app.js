var myGame = function(){
  this.fiveCards = []
  this.heldCards = []
  this.allCards  = this.mapCards();
  this.cash      = 1000
  this.setUp();
}

myGame.prototype.setUp = function(){
  $('#cashAmount').html(this.cash)
  $('#playHand').on("click", this.playHand.bind(this))
  $('#dealNext').on("click", this.dealNextHand.bind(this))
}

myGame.prototype.playHand = function(){
  this.bet = $('#betAmount').val()
  $('#result').html("You bet: "+this.bet)
  this.cash -= this.bet
  $('#cashAmount').html(this.cash)
  $('#betAmount').val("")
  this.allCards  = this.mapCards();
  this.fiveCards = [];
  this.heldCards = [];
  $('#cards').html("")
  this.getRandomCardsSet(5)
  console.log(this.fiveCards)
  $('.playingCards').on("click", this.holdCard.bind(this))
}

myGame.prototype.dealNextHand = function(){
  this.fiveCards = []
  $('#cards').html("")
  for (var i = 0; i < this.heldCards.length; i++) {
    this.fiveCards.push(this.heldCards[i])
    $("#cards").append("<li><img class='playingCards' id='"+this.heldCards[i]+"'src='./images/classic-cards/"+this.heldCards[i]+".png' width='50'></li>")
  };
  this.getRandomCardsSet(5-this.heldCards.length);

  this.checkHand();
}

myGame.prototype.checkHand = function(){
  var result = $('#result')
  if (this.flush()){
    result.html("Got a flush!")
    console.log("Got a flush!");
    this.cash += (this.bet*15)
  }else if(this.straight()){
    result.html("Got a straight!")
    console.log("Got a straight!");
    this.cash += (this.bet*10)
  }else if(this.threeOfAKind()){
    result.html("Got three of a kind!")
    console.log("Got three of a kind!");
    this.cash += (this.bet*5)
  }else if(this.twoPair()){
    result.html("Got two pair")
    console.log("Got two pair");
    this.cash += (this.bet*2)
  }else if(this.pair()){
    result.html("Got a pair")
    console.log("Got a pair")
    this.cash += (this.bet*1.5)
  }
  $('#cashAmount').html(this.cash)
}

myGame.prototype.pair = function(){
  var arr = []
  for (var i = 0; i < this.fiveCards.length; i++) {
    arr.push(this.fiveCards[i].split(/_/)[1])
  };
  for (var i = 0; i < arr.length; i++) {
    var count = this.countInArray(arr, arr[i])
    if(count===2){
      return true
    }
  };
}

myGame.prototype.twoPair = function(){
  var arr = []
  var pairs = []
  for (var i = 0; i < this.fiveCards.length; i++) {
    arr.push(this.fiveCards[i].split(/_/)[1])
  };
  for (var i = 0; i < arr.length; i++) {
    var count = this.countInArray(arr, arr[i])
    if(count===2){
      pairs.push(count)
    }
  };
  console.log(pairs)
  if(pairs.length > 2){
    return true
  }
}

myGame.prototype.threeOfAKind = function(){
  var arr = []
  for (var i = 0; i < this.fiveCards.length; i++) {
    arr.push(this.fiveCards[i].split(/_/)[1])
  };
  for (var i = 0; i < arr.length; i++) {
    var count = this.countInArray(arr, arr[i])
    if(count===3){
      return true
    }
  };
}

myGame.prototype.straight = function(){
  var arr = [];
  for (var i = 0; i < this.fiveCards.length; i++) {
    arr.push(parseInt(this.fiveCards[i].split(/_/)[1]))
  };
  arr.sort();
  if(arr[0]===arr[1]-1 && arr[1]===arr[2]-1 && arr[2]===arr[3]-1 && arr[3]===arr[4]-1){
    return true
  }
}

myGame.prototype.flush = function(){
  var arr = [];
  for (var i = 0; i < this.fiveCards.length; i++) {
    arr.push(parseInt(this.fiveCards[i].split(/_/)[0]))
  };
  if(arr[0]===[1] && arr[1]===[2] && arr[2]===[3] && arr[3]===[4]){
    return true
  }
}

myGame.prototype.countInArray = function(array, what) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === what) {
      count++;
    }
  }
  return count;
}

myGame.prototype.holdCard = function(){
  $(event.currentTarget).addClass('chosen-card')
  this.heldCards.push(event.currentTarget.id)
}

myGame.prototype.mapCards = function(){
  var allCards = [];
  for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 13; j++) {
      allCards.push(i+"_"+j)
    };
  };
  return allCards
}

myGame.prototype.getRandomCardsSet = function(numberOfCards){
  for (var i = 0; i < numberOfCards; i++) {
    var cardNumber = Math.floor(Math.random() * this.allCards.length)
    var thisCard   = this.allCards.splice(cardNumber, 1)[0]
    this.fiveCards.push(thisCard)
    $("#cards").append("<li><img class='playingCards' id='"+thisCard+"'src='./images/classic-cards/"+thisCard+".png' width='50'></li>")
  };
}

window.onload = function(){
  var newgame = new myGame()
}