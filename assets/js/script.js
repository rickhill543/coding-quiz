// Create functions for basic html dynamic generation
// Create array of question objects
// Create functions for different stages of the quiz
// Create timer for the quiz
// Store scores into an array of objects



var headerEl = document.getElementById('header');
var mainEl = document.getElementById('main');
var highscoreStorage = document.getElementById('highscore')

var timeLeft = 0;
var currentQ = 0;

function welcome(backButtonEl, clearButtonEl, newScoreEl) {
    if (backButtonEl) {
        backButtonEl.remove();
    }
    if (clearButtonEl) {
        clearButtonEl.remove();
    }
    if (instructionsEl) {
        instructionsEl.remove();
    }
    if (startButtonEl) {
        startButtonEl.remove();
    }
    if (newScoreEl) {
        newScoreEl.remove();
    }
    var highScoreEl = document.createElement('div');
    highScoreEl.textContent = "View highscores";
    highScoreEl.className = "high-score";

    var timerEl = document.createElement('div');
    timerEl.textContent = "Time: " + timeLeft;
    timerEl.className = "timer";

    var titleEl = document.createElement('h1');
    titleEl.textContent = "Coding Quiz Challenge";
    titleEl.id = "title";
    titleEl.className = "title-question welcome";

    var instructionsEl = document.createElement('p');
    instructionsEl.textContent = "Try to answer the following code-related questions within the time limit\nKeep in mind that incorrect answers will penalize your score/time by ten seconds!";
    instructionsEl.className = "instructions";

    var startContainerEl = document.createElement('div');
    startContainerEl.id = "start-container";

    var startButtonEl = document.createElement('button');
    startButtonEl.textContent = "Start!";
    startButtonEl.className = "start-button";

    headerEl.appendChild(highScoreEl);
    headerEl.appendChild(timerEl);
    mainEl.insertBefore(titleEl, mainEl.firstChild);
    mainEl.appendChild(instructionsEl);
    mainEl.appendChild(startContainerEl);
    startContainerEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", function() {
        quiz(highScoreEl, titleEl, instructionsEl, startButtonEl);
    });
    highScoreEl.addEventListener("click", function() {
        highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl);
    });
    //return(highScoreEl, titleEl, instructionsEl, startButtonEl);
}

function quiz(highScoreEl, titleEl, instructionsEl, startButtonEl) {

    //titleEl.className = "title-question quiz";
    titleEl.classList.remove("welcome");
    instructionsEl.remove();
    startButtonEl.remove();

    timeLeft = 75;
    currentQ = 0;
    timerEl = document.querySelector(".timer");
    timerEl.textContent = "Time: " + timeLeft;
    var questionArray = [
        {
            "question": "Commonly used data types DO NOT include:",
            "pAnsA": "1. strings",
            "pAnsB": "2. booleans",
            "pAnsC": "3. alerts",
            "pAnsD": "4. numbers",
            "rAns": "C",
            "uAns": ""
        },
        {
            "question": "The condition in an if / else statement is enclosed with ___",
            "pAnsA": "1. quotes",
            "pAnsB": "2. curly brackets",
            "pAnsC": "3. parenthesis",
            "pAnsD": "4. square brackets",
            "rAns": "B",
            "uAns": ""
        },
        {
            "question": "Arrays in JavaScript can be used to store ___",
            "pAnsA": "1. numbers and strings",
            "pAnsB": "2. other arrays",
            "pAnsC": "3. booleans",
            "pAnsD": "4. all of the above",
            "rAns": "D",
            "uAns": ""
        },
        {
            "question": "String values must be enclosed within ___ when being assigned to variables",
            "pAnsA": "1. commas",
            "pAnsB": "2. curly brackets",
            "pAnsC": "3. quotes",
            "pAnsD": "4. parenthesis",
            "rAns": "C",
            "uAns": ""
        },
        {
            "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
            "pAnsA": "1. JavaScript",
            "pAnsB": "2. terminal/bash",
            "pAnsC": "3. for loop",
            "pAnsD": "4. console.log",
            "rAns": "D",
            "uAns": ""
        }
        ];

        var buttonContainerEl = document.createElement('div');
        buttonContainerEl.id = "button-container";
        var buttonOneEl = document.createElement('button');
        buttonOneEl.className = "button-one btn";
        var buttonTwoEl = document.createElement('button');
        buttonTwoEl.className = "button-two btn";
        var buttonThreeEl = document.createElement('button');
        buttonThreeEl.className = "button-three btn";
        var buttonFourEl = document.createElement('button');
        buttonFourEl.className = "button-four btn";
        var responseEl = document.createElement('p');
        responseEl.className = "response";

        mainEl.appendChild(buttonContainerEl);
        buttonContainerEl.appendChild(buttonOneEl);
        buttonContainerEl.appendChild(buttonTwoEl);
        buttonContainerEl.appendChild(buttonThreeEl);
        buttonContainerEl.appendChild(buttonFourEl);
        buttonContainerEl.appendChild(responseEl);


        quizTimer = setInterval( function() {
        
            if (timeLeft >= 1) {
                timeLeft--
                timerEl.textContent = "Time: " + timeLeft;
            } else {
                //timeLeft--
                clearInterval(quizTimer);
                end(highScoreEl, titleEl, buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl, responseEl);
                return;
            }
        console.log(timeLeft);
    }, 1000)


        function Questions(titleEl, instructionsEl, startButtonEl, questionArray, end) {
            console.log("currentQ: " + currentQ);
            if (currentQ < questionArray.length) {
                titleEl.textContent = questionArray[currentQ].question;
                buttonOneEl.textContent = questionArray[currentQ].pAnsA;
                buttonTwoEl.textContent = questionArray[currentQ].pAnsB;
                buttonThreeEl.textContent = questionArray[currentQ].pAnsC;
                buttonFourEl.textContent = questionArray[currentQ].pAnsD;
            } else {
                end(highScoreEl, titleEl, buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl, responseEl);
            }
        }
        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);


            buttonOneEl.addEventListener("click", function() {
                var a = "A";
                console.log("new currentQ " + currentQ);
                    if (a == questionArray[currentQ].rAns) {
                        questionArray[currentQ].uAns = true;
                        console.log(questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Correct";
                        currentQ += 1;
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    } else {
                        questionArray[currentQ].uAns = false;
                        console.log("user answer was: " + questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Incorrect";
                        currentQ += 1;
                        timeLeft = timeLeft - 5;
                        console.log("doubled? " + timeLeft);
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    }
            })
            buttonTwoEl.addEventListener("click", function() {
                var b = "B";
                console.log("new currentQ " + currentQ);
                    if (b == questionArray[currentQ].rAns) {
                        questionArray[currentQ].uAns = true;
                        console.log(questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Correct";
                        currentQ += 1;
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    } else {
                        questionArray[currentQ].uAns = false;
                        console.log("user answer was: " + questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Incorrect";
                        currentQ += 1;
                        timeLeft = timeLeft - 5;
                        console.log("doubled? " + timeLeft);
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    }
            })
            buttonThreeEl.addEventListener("click", function() {
                var c = "C";
                console.log("new currentQ " + currentQ);
                    if (c == questionArray[currentQ].rAns) {
                        questionArray[currentQ].uAns = true;
                        console.log(questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Correct";
                        currentQ += 1;
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    } else {
                        questionArray[currentQ].uAns = false;
                        console.log("user answer was: " + questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Incorrect";
                        currentQ += 1;
                        timeLeft = timeLeft - 5;
                        console.log("doubled? " + timeLeft);
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    }
            })
            buttonFourEl.addEventListener("click", function() {
                var d = "D";
                console.log("new currentQ " + currentQ);
                    if (d == questionArray[currentQ].rAns) {
                        questionArray[currentQ].uAns = true;
                        console.log(questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Correct";
                        currentQ += 1;
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    } else {
                        questionArray[currentQ].uAns = false;
                        console.log("user answer was: " + questionArray[currentQ].uAns);
                        responseEl.textContent = "~~Incorrect";
                        currentQ += 1;
                        timeLeft = timeLeft - 5;
                        console.log("doubled? " + timeLeft);
                        Questions(titleEl, instructionsEl, startButtonEl, questionArray, end);
                    }
            })
    console.log("end of quiz function")
    //highScoreEl.addEventListener("click", highScore);

    //highScoreEl.addEventListener("click", function() {
    //    highScore(titleEl);
    //});

}
// end of quiz functiom

function highStore() {
    //alert("click works");
    }

function end(highScoreEl, titleEl, buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl, responseEl, instructionsEl, startButtonEl) {
    console.log("time left in end function " + timeLeft);
    clearInterval(quizTimer);

    //titleEl.classList.remove("quiz");
    buttonOneEl.remove();
    buttonTwoEl.remove();
    buttonThreeEl.remove();
    buttonFourEl.remove();
    responseEl.remove();

    timerEl.textContent = "Time: " + timeLeft;
    titleEl.textContent = "All Done!";

    var scoreEl = document.createElement('p');
    scoreEl.textContent = "Your final score was " + timeLeft;
    scoreEl.className = "final-score";
    var submitContainerEl = document.createElement('div');
    submitContainerEl.id = "submit-container"
    var submitTextEl = document.createElement('p');
    submitTextEl.textContent = "Enter initials:";
    submitTextEl.className ="submit-child submit-text";
    var submitInputEl = document.createElement('input');
    submitInputEl.textContent = "Enter initials:";
    submitInputEl.id = "save-data";
    submitInputEl.className ="submit-child submit-input";
    var submitButtonEl = document.createElement('button');
    submitButtonEl.textContent = "Submit";
    submitButtonEl.setAttribute("type", "submit")
    submitButtonEl.className ="submit-child submit-button";


    mainEl.appendChild(scoreEl);
    mainEl.appendChild(submitContainerEl);
    submitContainerEl.appendChild(submitTextEl);
    submitContainerEl.appendChild(submitInputEl);
    submitContainerEl.appendChild(submitButtonEl);
/*
    var saveScores = function() {
        var input = document.getElementById("highscore");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
*/
/*    submitButtonEl.addEventListener("click", function () {
        var input = document.getElementById("save-data").value;
        tempScore = timeLeft;
        timeLeft = 0;
        localStorage.setItem("server", input);
        highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl);
        console.log("input = " + input);
    });
*/
    submitButtonEl.addEventListener("click", function () {
        score = timeLeft;
        timeLeft = 0;
        // do a storage thing here
        newScoreEl = document.createElement("li");
        newScoreEl.textContent = score;
        console.log("score value" + score);
        localStorage.setItem("Highscore", score);
        highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl, submitContainerEl, scoreEl, newScoreEl, score);
    });
    highScoreEl.addEventListener("click", highScore);
}

function highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl, submitContainerEl, scoreEl, newScoreEl, score) {
    console.log("just now timeleft: " + timeLeft)
    if (instructionsEl) {
        instructionsEl.remove();
    }
    if (startButtonEl) {
        startButtonEl.remove();
    }
    if (scoreEl) {
        scoreEl.remove();
    }
    if (submitContainerEl) {
        submitContainerEl.className = "display-none";
    }
    if (newScoreEl) {
        highscoreStorage.insertBefore(newScoreEl, highscoreStorage.firstChild);
    }
    /*if (score){
        var x = document.createElement("li");
        var y = localStorage.getItem("Highscore")
        x.textContent = y;
        highscoreStorage.insertBefore(x, highscoreStorage.firstChild);
    }*/

    if (timeLeft == 0) {
        highScoreEl.className = "high-score display-none";
        timerEl.className = "timer display-none";
        titleEl.textContent = "High Scores";


        var backButtonEl = document.createElement('button');
        backButtonEl.textContent = "Go Back";
        backButtonEl.className ="hs-button back-button";
        var clearButtonEl = document.createElement('button');
        clearButtonEl.textContent = "Clear Highscores";
        clearButtonEl.className ="hs-button clear-button";

        highscoreStorage.appendChild(backButtonEl);
        highscoreStorage.appendChild(clearButtonEl);
        highscoreStorage.classList.remove("display-none");
    } else {
        return(alert("you must complete the quiz first! And this is not a pause button!"));
    }

    backButtonEl.addEventListener("click", function () {
        titleEl.remove();
        timerEl.remove();
        highScoreEl.remove();
        welcome(backButtonEl, clearButtonEl, newScoreEl);
    })
    //titleEl.textContent = "High Scores";
    //console.log(titleEl.textContent);
}

welcome();

//highScoreEl.addEventListener("click", highScore);

console.log("end of functions reaaa")
