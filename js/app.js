let index = 0;
let ans = 0;
let score = 0;
let wrong = 0;

// For Random Questions On Every Run
let questions = quiz.sort(function(){
    return 0.5 - Math.random();
});

let totQstn = questions.length;

// Document Ready Function
$(function(){
    let totalTime = 200;
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval(function(){
        counter++;
        min = Math.floor((totalTime - counter)/60);
        sec = totalTime - min*60 - counter;

        $(".timer span").text(min + ":" + sec);

        if(counter == totalTime){
            alert("Time Up ! Press Ok To Show the Result.");
            result();
            clearInterval(timer)
        }
    } , 1000);

    printQuestion(index);
});

// Funtion To Print The Question & The 4 options
function printQuestion(i){
    $(".qstn").text(questions[i].question);
    $(".mcqs span").eq(0).text(questions[i].option[0]);
    $(".mcqs span").eq(1).text(questions[i].option[1]);
    $(".mcqs span").eq(2).text(questions[i].option[2]);
    $(".mcqs span").eq(3).text(questions[i].option[3]);
}

// Function To Check Whether The Entered Option Is Correct or Not
function checkAnswer(option){
    ans++;
    let ansGiven = $(option).data("opt");
    if(ansGiven == questions[index].answer){
        $(option).addClass("correct");
        score++;
    }
    else{
        $(option).addClass("incorrect");
        wrong++;
    }
    $(".score span").text(score);
    $(".mcqs span").attr("onclick", "");
}

// Function To Show Next Question When User Clicks On "Next" Button 
function showNext(){
    if(index >= questions.length - 1){
        showResult(0);
        return;
    }
    index++;

    $(".mcqs span").removeClass();
    $(".mcqs span").attr("onclick", "checkAnswer(this)");
    printQuestion(index);
}

// Function To Display Result 
function showResult(i){

    if(i==1 && index < totQstn-1 && !confirm("WARNING ! Quiz Hasn't Finished Yet. Click Ok To EXIT Anyway !")){ 
        return;
    }
    
    $("#QUESTION").hide();
    $("#RESULT").show();

    $("#total").text(totQstn);
    $("#attempted").text(ans);
    $("#correct").text(score);
    $("#incorrect").text(wrong);
}

// Function To Display Result Only If Countdown Timer Ends
function result(){
    $("#QUESTION").hide();
    $("#RESULT").show();

    $("#total").text(totQstn);
    $("#attempted").text(ans);
    $("#correct").text(score);
    $("#incorrect").text(wrong);
} 