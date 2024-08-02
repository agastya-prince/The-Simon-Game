
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//step 7 : to choose any
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started)
    {
        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

//step 4 : happens when user clicks a button
$(".btn").click(function() {
    //var of user click
    var userChosenColour = $(this).attr("id");
    // user's chose stored in array
    userClickedPattern.push(userChosenColour);
    // sound click acc to user
    playSound(userChosenColour);
    // animate
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//step 8 - check pc generated color with user click
function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function ()
            {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        //Step 8: to do when user choice is wrong
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }   
}

//step 2 function to show user the button to select
function nextSequence()
{
    userClickedPattern = [];

    level++;

    $("h1").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColourChosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChosen);

    // step 3
    // effect on clicking
    $("." + randomColourChosen).fadeIn(100);
    $("." + randomColourChosen).fadeOut(100);
    $("." + randomColourChosen).fadeIn(100);

    // play audio
    playSound(randomColourChosen);
}


//step 5 : create audio play function 
//         & call to pc choice
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//step 6
function animatePress(currentColour)
{
    $("." + currentColour).addClass("pressed");
    setTimeout(100);
    $("." + currentColour).removeClass("pressed");
}

//step 10 : function to restart
function startOver()
{
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
  started = false;
}