var targetNumber = Math.floor(Math.random()*101);
var currentGuess;
var lastGuessDifference = 100;

$(document).ready(function(){
  

  /*--- Display information modal box ---*/
    $(".what").click(function(){
      $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });

  $("#guessButton").click(function(e){
    e.preventDefault();
    guess();
    checkInputs();
    $('#userGuess').val('');  
  });
  
  $(".new").click(function(){
    resetGame();  
  });

});

function guess() {
  currentGuess = +$("#userGuess").val();
}

function increaseCount(){
  $('#count').html(parseInt($('#count').html(), 10)+1);
}

function resetGame(){
  targetNumber = Math.floor(Math.random()*101);
  $('text[type=submit], input[type=submit]').attr('disabled',false);
  $('section ul').empty();
  $('#count').html("0");    
  $('#userGuess').val('');
  $('#feedback').html('Make your guess!');
}

function checkInputs(){
  if(currentGuess =="" || currentGuess%1 != 0){
    alert("Please input integers");   
  }
  else{
    if(parseInt($('#count').text())==0){
      evaluateFirstGuess();
      increaseCount();
    } 
    else{
      evaluateGuess();
      increaseCount();  
    }   
  }
}
  
function evaluateFirstGuess(){
  if(currentGuess==targetNumber){ 
    $('#feedback').html('CORRECT!');
    $('text[type=submit], input[type=submit]').attr('disabled',true);
    $("#guessList").append('<li class="correct">'+currentGuess+'!</li>');
  }
  else{
    $('#feedback').html('Not right, try again');
    $("#guessList").append('<li>'+currentGuess+'</li>');
  }
}

function evaluateGuess (){
  if(currentGuess==targetNumber){ 
    $('#feedback').html('CORRECT!');
    $('text[type=submit], input[type=submit]').attr('disabled',true);
    $("#guessList").append('<li class="correct">'+currentGuess+'!</li>');
  }
  else{
    var difference = Math.abs(targetNumber-currentGuess)    
    if(difference>lastGuessDifference){
      $('#feedback').html('Colder');
      $("#guessList").append('<li class="colder">'+currentGuess+'</li>');
    }
    else if (difference<lastGuessDifference) {
      $('#feedback').html('Warmer');
      $("#guessList").append('<li class="warmer">'+currentGuess+'</li>'); 
    }
    else{
      $('#feedback').html('Same difference');
      $("#guessList").append('<li>'+currentGuess+'</li>');  
    }
    lastGuessDifference = difference; 
  }
}

