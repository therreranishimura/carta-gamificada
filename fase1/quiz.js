// Dados do quiz: pergunta, opções e resposta correta
const quizData = [
  {
    pergunta: "Qual era a cor da blusa que eu estava usando no nosso primeiro encontro?",
    opcoes: ["Rosa", "Laranja", "Branca"],
    resposta: "Laranja"
  },
  {
    pergunta: "Qual foi a primeira música que você me mandou?",
    opcoes: ["Open your eyes - Snow Patrol", "Seafret - Oceans", "Cornfield Chase - Hans Zimmer"],
    resposta: "Cornfield Chase - Hans Zimmer"
  },
  {
    pergunta: "Qual foi o primeiro filme que assistimos no cinema?",
    opcoes: ["Super Mario Bros", "Oppenheimer", "Missão impossível"],
    resposta: "Super Mario Bros"
  },
  {
    pergunta: "De qual time era a primeira camiseta de CS que eu tentei te roubar?",
    opcoes: ["Imperial", "Furia", "Vitality"],
    resposta: "Furia"
  },
  {
    pergunta: "Qual foi o primeiro presente que eu te dei?",
    opcoes: ["Camiseta", "Caneca", "Tênis"],
    resposta: "Tênis"
  }
];

// Índices de controle do quiz
let quizIndex = 0;
let correctAnswers = 0;

// Carrega a próxima pergunta e renderiza na tela
function loadQuestion() {
  const quizEl = document.getElementById('quiz');
  const questionData = quizData[quizIndex];

  quizEl.innerHTML = `
    <div class="question">
      <h3>${questionData.pergunta}</h3>
      <div class="options">
        ${questionData.opcoes.map(op => `
          <button onclick="checkAnswer('${op}')">${op}</button>
        `).join('')}
      </div>
    </div>
  `;
}

// Verifica se a resposta está correta e avança
function checkAnswer(selected) {
  const correct = quizData[quizIndex].resposta;

  if (selected === correct) {
    correctAnswers++;
  }

  quizIndex++;

  if (quizIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Mostra o resultado final com botão de próxima fase ou reinício
function showResult() {
  const quizEl = document.getElementById('quiz');
  const feedbackEl = document.getElementById('feedback');

  if (correctAnswers === quizData.length) {
    quizEl.innerHTML = `
      <h2 class="feedback">Parabéns você completou o quiz!</h2>
      <button id="nextPhaseButton" class="quizButton" onclick="location.href='/carta-gamificada/fase2/memoria.html'">CONTINUAR</button>
    `;
    feedbackEl.textContent = '';
  } else {
    quizEl.innerHTML = '';
    feedbackEl.innerHTML = `
      <h2 class="feedback">Você acertou ${correctAnswers} de ${quizData.length} perguntas</h2><br>
      <button id="restartButton" class="quizButton" onclick="restartQuiz()">TENTAR NOVAMENTE</button>
    `;
  }
}

// Reinicia os dados e carrega a primeira pergunta
function restartQuiz() {
  quizIndex = 0;
  correctAnswers = 0;
  document.getElementById('feedback').textContent = '';
  loadQuestion();
}

// Carrega a primeira pergunta ao abrir a página
window.onload = loadQuestion;
