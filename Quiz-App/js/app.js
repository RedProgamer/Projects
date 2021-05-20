const quizData = [
    {
        question: "How old is Nirmal?",
        a: "10",
        b: "16",
        c: "26",
        d: "110",
        correct: 'b',
    }, 
    {
        question: "What is the most popular programming language?",
        a: "Python",
        b: "C++",
        c: "Java",
        d: "Javascript",
        correct: 'd',
    },
    {
        question: "Who is the prime minister of India?",
        a: "Narendra Modi",
        b: "Manmohan Singh",
        c: "Nirmal Jyoti Biswas",
        d: "DoLund Trump",
        correct: 'a',
    },
    {
        question: "Why are you gay?",
        a: "Havok Gae",
        b: "Havok Gae ftw",
        c: "Havok is Gae",
        d: "All of the above",
        correct: 'd',
    },
    {
        question: "Who is the co-founder of Microsoft?",
        a: "Paul Alen",
        b: "Steve Jobs",
        c: "Nirmal Jyoti Biswas",
        d: "Brandom Beck",
        correct: 'a',
    }
];

let currentQuestion = 0;
let answer = undefined;
let score = 0;

const questionEl = document.querySelector('#question');
const answersEL = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');

const a_text = document.querySelector('#a_text');
const b_text = document.querySelector('#b_text');
const c_text = document.querySelector('#c_text');
const d_text = document.querySelector('#d_text');
const submitBtn = document.querySelector('#submit');

loadQuiz();

function getSelected() {
    let answer = undefined;

    answersEL.forEach(function(ans) {
        if(ans.checked)
            answer =  ans.id;
    });
    return answer;
}

function checkCorrectAnswer(answer) {
    if(answer && answer === quizData[currentQuestion].correct) {
        score++;
        console.log(score);
    }
}

function loadQuiz() {

    deSelectAnswers();

    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;

    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deSelectAnswers() {
    answersEL.forEach(function(ans) {
        ans.checked = false;
    });
}

submitBtn.addEventListener('click', ()=> {

    let answers = getSelected();
    checkCorrectAnswer(answers);


    currentQuestion++;

    if(currentQuestion < quizData.length) {
        loadQuiz();
    }
    else {
        quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                        <button onclick="location.reload()">Reload</button>`
        console.log("Finished");
    }
});