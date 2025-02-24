/*Array de perguntas*/
const questions = [
    {
        question: "Qual é a soma dos ângulos externos de qualquer polígono?",
        answers: [
            { text: "180°", correct: false },
            { text: "270°", correct: false },
            { text: "540°", correct: false },
            { text: "360°", correct: true },
        ]
    },
    {
        question: "Qual é a medida de cada ângulo interno de um decágono regular?",
        answers: [
            { text: "108°", correct: false },
            { text: "120°", correct: false },
            { text: "144°", correct: true },
            { text: "150°", correct: false },
        ]
    },
    {
        question: "Quantas diagonais tem um octógono?",
        answers: [
            { text: "20", correct: false },
            { text: "24", correct: true },
            { text: "28", correct: false },
            { text: "32", correct: false },
        ]
    },
    {
        question: "Qual é a medida de um ângulo suplementar a um ângulo de 110°?",
        answers: [
            { text: "90°", correct: false },
            { text: "70°", correct: true },
            { text: "110°", correct: false },
            { text: "45°", correct: false },
        ]
    }
];

/*Seleciona o elemento HTML pelo seu respectivo id e o armazena*/
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

/*Zera os pontos e o número da questão*/
let currentQuestionIndex = 0;
let score = 0;

/*Inicia o quiz, chamando a função que exibe a questão*/
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/*Exibe uma pergunta do quiz, a qual ele pega daquele array de perguntas*/
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

/*Limpa o estado atual para que possa vir outra pergunta */
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/*Verifica se ele escolheu a resposta certa ou errada e exibe o botão next */
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

/*Mostra a pontuação do usuário no final do quiz e muda o texto do botão 
next para 'jogar novamente'*/
function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de um total de ${questions.length}!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

/*Controla a quantidade atual de perguntas para exibir ou uma questão 
ou a pontuação */
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

/*Permite que o botão next avance para outra pergunta ou que ele 
reinicie o quiz ("jogar novamente") */
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
} );

/*Chamada da função que inicia o quiz*/
startQuiz();