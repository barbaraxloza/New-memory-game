const roomData = [
    { code: "RKD", description: "Resort King Deluxe" },
    { code: "RDD", description: "Resort Double Deluxe" },
    { code: "PANVD", description: "Panoramic View Deluxe" },
    { code: "PANDD", description: "Panoramic View Double Deluxe" },
    { code: "PANCD", description: "Panoramic Corner Deluxe" },
    { code: "ACCES", description: "Super Accessible Room" },
    { code: "EK", description: "Encore King" },
    { code: "EQ", description: "Encore Queen" },
    { code: "EPK", description: "Encore Panoramic King" },
    { code: "EPQ", description: "Encore Panoramic Queen" },
    { code: "EACCES", description: "Super Accessible Room" }
];

let flashcardIndex = 0;
let quizIndex = 0;
let score = 0;

const flashcardTitle = document.getElementById('flashcard-title');
const flashcardContent = document.getElementById('flashcard-content');
const nextBtn = document.getElementById('next-btn');
const quizTitle = document.getElementById('quiz-title');
const question = document.getElementById('question');
const choices = document.getElementById('choices');
const submitBtn = document.getElementById('submit-btn');
const result = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const retryBtn = document.getElementById('retry-btn');

function showFlashcard() {
    if (flashcardIndex < roomData.length) {
        flashcardContent.textContent = `${roomData[flashcardIndex].code}: ${roomData[flashcardIndex].description}`;
        flashcardIndex++;
    } else {
        flashcardContent.textContent = "You've gone through all the flashcards!";
        nextBtn.disabled = true;
    }
}

function showQuizQuestion() {
    const room = roomData[quizIndex];
    question.textContent = `What room type is "${room.code}"?`;
    choices.innerHTML = "";
    
    const shuffledData = roomData.sort(() => 0.5 - Math.random());
    shuffledData.slice(0, 4).forEach((data) => {
        const li = document.createElement('li');
        li.textContent = data.description;
        li.addEventListener('click', () => selectChoice(li));
        choices.appendChild(li);
    });
}

function selectChoice(choiceElement) {
    const selected = document.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }
    choiceElement.classList.add('selected');
}

function checkAnswer() {
    const selected = document.querySelector('.selected');
    if (selected) {
        if (selected.textContent === roomData[quizIndex].description) {
            score++;
        }
        quizIndex++;
        if (quizIndex < roomData.length) {
            showQuizQuestion();
        } else {
            showResult();
        }
    } else {
        alert('Please select an answer!');
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    result.style.display = 'block';
    resultMessage.textContent = `You scored ${score} out of ${roomData.length}`;
}

function retryQuiz() {
    score = 0;
    quizIndex = 0;
    flashcardIndex = 0;
    nextBtn.disabled = false;
    document.getElementById('quiz').style.display = 'block';
    result.style.display = 'none';
    showQuizQuestion();
}

nextBtn.addEventListener('click', showFlashcard);
submitBtn.addEventListener('click', checkAnswer);
retryBtn.addEventListener('click', retryQuiz);

window.onload = () => {
    showFlashcard();
    showQuizQuestion();
};
