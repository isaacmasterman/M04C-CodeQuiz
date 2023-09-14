console.log("Script loaded");

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        question: "The conditions in an if / else statement is enclosed within ____.",
        choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        answer: "Parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        answer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/bash", "For loops", "Console log"],
        answer: "Console log"
    }
];

const startQuizButton = document.getElementById("start-quiz-btn");
const timerDisplay = document.getElementById("timer");
const questionsSection = document.getElementById("quiz-questions");
const endOfQuizSection = document.getElementById("end-of-quiz");
const questionDivs = document.querySelectorAll(".question");

// Initialize the timer value
let timeLeft = 75;
let timerInterval;

// Current question index
let currentQuestionIndex = 0;

// Function to display a question
function displayQuestion(index) {

    questionsSection.innerHTML = '';
    questionsSection.style.display = "block";
    // Check if there are more questions
    if (index < questions.length) {
        const currentQuestion = questions[index];

        // Create question element
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = currentQuestion.question;
        questionDiv.appendChild(questionTitle);

        const choicesList = document.createElement("ul");
        currentQuestion.choices.forEach(choice => {
            const choiceItem = document.createElement("li");
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", handleAnswerSelection);
            choiceItem.appendChild(choiceButton);
            choicesList.appendChild(choiceItem);
    // console.log("Displaying question:", index);
    // console.log("Current question:", currentQuestion);
        });

        questionDiv.appendChild(choicesList);
        // Create feedback div for the current question
        const feedbackDiv = document.createElement("div");
        feedbackDiv.className = "feedback";
        feedbackDiv.style.display = "none";
        questionDiv.appendChild(feedbackDiv);
        
        questionsSection.appendChild(questionDiv);
    } else {
        endQuiz();
    }
}

// Function to handle answer selection
function handleAnswerSelection(event) {
    event.stopPropagation();
    // console.log("Answer button clicked");
    const selectedButton = event.target;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const feedbackDiv = selectedButton.closest(".question").querySelector(".feedback");

    // Check if the selected answer is correct
    if (selectedButton.textContent !== correctAnswer) {
        timeLeft -= 10;
        feedbackDiv.textContent = "Wrong!";
    } else {
        feedbackDiv.textContent = "Correct!";
    }

    // Display feedback for 1 second
    feedbackDiv.style.display = "block";
    setTimeout(() => {
        feedbackDiv.style.display = "none";
    }, 8000);

    // Move to the next question
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    // console.log("Answer selected:", selectedButton.textContent);
}

// Modify the startTimer function to also display the first question
function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion(currentQuestionIndex);
}

function allQuestionsAnswered() {
    return currentQuestionIndex >= questions.length;
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    questionsSection.style.display = "none";
    document.getElementById("final-score").textContent = timeLeft;
    endOfQuizSection.style.display = "block";
}

// Event listener for the "Start Quiz" button
startQuizButton.addEventListener("click", function() {
    document.getElementById("quiz-intro").style.display = "none";
    startTimer();
    console.log("Start Quiz button clicked");
});
