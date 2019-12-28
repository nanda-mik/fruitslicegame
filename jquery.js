var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){

$("#startreset").click(function(){
    if(playing == true){
        location.reload();
    }else{
        playing = true;
        score = 0; 
        $("#scorevalue").html(score);
        
        $("#trialsleft").show();
        trialsleft = 3;
        addHearts();

        $("#gameOver").hide();

        $("#startreset").html("Reset Game");

        startAction();
    }
});

// slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);
});


function addHearts(){
    $('#trialsleft').empty();
    for(i = 0; i< trialsleft; i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
     $("#fruit1").show();
     chooseFruit();
     $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

    step = 1 + Math.round(5*Math.random());
    action = setInterval(function(){
        $("#fruit1").css('top',
        $("#fruit1").position().top + step);

         //check if the fruit is too low
         if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsleft > 1 ){
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsleft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsleft").hide();
                stopAction();
            }
        }
    }, 10);
}

function chooseFruit(){
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] +'.png');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});