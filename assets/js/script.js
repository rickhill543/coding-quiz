// Create functions for basic html dynamic generation
// Create array of question objects
// Create functions for different stages of the quiz
// Create timer for the quiz
// Store scores into an array of objects


// global variables
var headerEl = document.getElementById('header');
var mainEl = document.getElementById('main');
var highscoreStorage = document.getElementById('highscore')

var timeLeft = 0;
var currentQ = 0;

// landing function that removes looped elements, creates new elements and handles the quiz starting button
function welcome(backButtonEl, clearButtonEl, newScoreEl) {
    // removes previous stages elements
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
    if (highscoreStorage) {
        highscoreStorage.classList.add("display-none");
    }
    // creates new elements
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

    // places new elements
    headerEl.appendChild(highScoreEl);
    headerEl.appendChild(timerEl);
    mainEl.insertBefore(titleEl, mainEl.firstChild);
    mainEl.appendChild(instructionsEl);
    mainEl.appendChild(startContainerEl);
    startContainerEl.appendChild(startButtonEl);

    // click events triggering either the quiz or highscore data
    startButtonEl.addEventListener("click", function() {
        quiz(highScoreEl, titleEl, instructionsEl, startButtonEl);
    });
    highScoreEl.addEventListener("click", function() {
        highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl);
    });
}

// quiz function
function quiz(highScoreEl, titleEl, instructionsEl, startButtonEl) {
    // removes old elements
    titleEl.classList.remove("welcome");
    instructionsEl.remove();
    startButtonEl.remove();

    // local function variables
    timeLeft = 75;
    currentQ = 0;
    timerEl = document.querySelector(".timer");
    timerEl.textContent = "Time: " + timeLeft;
    // quiz qestion object array
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

        // quiz button element creation
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

        // quiz timer function
        quizTimer = setInterval( function() {
            if (timeLeft >= 1) {
                timeLeft--
                timerEl.textContent = "Time: " + timeLeft;
            } else {
                clearInterval(quizTimer);
                end(highScoreEl, titleEl, buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl, responseEl);
                return;
            }
        console.log(timeLeft);
    }, 1000)

        // quiz question cycling function
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

            // quiz button logic that calls the Question function until there are no more question left and stores the validity of the users ansers
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
}

// the funtion that runs when the timer reaches 0 or there are no more questions left
function end(highScoreEl, titleEl, buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl, responseEl, instructionsEl, startButtonEl, idCount) {
    clearInterval(quizTimer);

    var stor = localStorage.getItem("hsArray");
    console.log("stor " + stor);

    // if the highscore array has information use that array else use blank array
    if (stor) {
        highscoreArray = JSON.parse(stor);
        console.log("arrray used storage " + stor);
    } else {
        highscoreArray = [];
        console.log("arrray used new " + stor);
    }



    // id counter that gets stored locally
    idCount = highscoreArray.length + 1;
    console.log("IDcount " + idCount);

    // old element cleanup
    buttonOneEl.remove();
    buttonTwoEl.remove();
    buttonThreeEl.remove();
    buttonFourEl.remove();
    responseEl.remove();

    timerEl.textContent = "Time: " + timeLeft;
    titleEl.textContent = "All Done!";

    // element creation for the ending step of the quiz
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

    // click event that grabs the users initials and score and pushes them into the highscore array and stores them locally... it also calls the highscore display function
    submitButtonEl.addEventListener("click", function () {
        inputField = document.getElementById("save-data").value;
        score = timeLeft;
        console.log("IDcount " + idCount);
        userInfo = {
            uesrId: idCount,
            userScore: score,
            userInitials: inputField
        };
        highscoreArray.push(userInfo);
        timeLeft = 0;

        newScoreEl = document.createElement("li");
        newScoreEl.textContent = userInfo.userInitials + ": " + score;

        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("Highscore", score);
        localStorage.setItem("idCount", idCount);
        localStorage.setItem("hsArray", JSON.stringify(highscoreArray))
        // for some reason, I cannot get additional entries to store different player initials... it always repeats the first name despite my attempt directly below
        inputField.value = " ";

        highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl, submitContainerEl, scoreEl, newScoreEl, score);
    });
    highScoreEl.addEventListener("click", highScore);
}

// highscore display function
function highScore(highScoreEl, timerEl, titleEl, instructionsEl, startButtonEl, submitContainerEl, scoreEl, newScoreEl, score) {
    console.log("just now timeleft: " + timeLeft)
    // old element cleanup
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
    if (highscoreStorage) {
        highscoreStorage.classList.remove("display-none");
    }
    if (newScoreEl) {
        newEntryEl = document.createElement("li");
        newEntryEl.className = "new-entry display-block";
        newEntryEl.textContent = userInfo.userInitials + ": " + score;
        highscoreStorage.insertBefore(newEntryEl, highscoreStorage.firstChild);
    }
    // if ending quiz criteria are met, create elements and assign information
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

    // click event that removes old elements and takes the user back to the welcome screen
    backButtonEl.addEventListener("click", function () {
        titleEl.remove();
        timerEl.remove();
        highScoreEl.remove();
        welcome(backButtonEl, clearButtonEl, newScoreEl);
    })
    // clears the highscore list
    clearButtonEl.addEventListener("click", function () {
        document.querySelectorAll('.new-entry').forEach(li => li.remove());
    })
}

welcome();