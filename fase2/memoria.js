// Obtém o container do tabuleiro onde as cartas serão adicionadas
const board = document.getElementById('game-board');

// Array com os nomes das imagens para os pares do jogo
const cards = [
  '1.png', '2.png', '3.png', '4.png', '5.png',
  '6.png', '7.png', '8.png', '9.png', '10.png'
];

// Duplica e embaralha as cartas para criar o tabuleiro
const shuffled = [...cards, ...cards]
  .sort(() => Math.random() - 0.5);

let flippedCards = []; // Armazena as cartas viradas atualmente
let lockBoard = false; // Evita que o jogador vire mais de duas cartas ao mesmo tempo
let matched = 0; // Conta quantos pares foram encontrados

// Elementos da tela de fim de jogo
const endGameOverlay = document.getElementById('endGame');
const nextButton = document.getElementById('nextButton');

// Exibe a tela de fim de jogo
function showEndGame() {
  endGameOverlay.classList.add('show');
}

// Cria as cartas no tabuleiro
shuffled.forEach(src => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="front"></div>
    <div class="back" style="background-image: url('img/${src}')"></div>
  `;

  // Ignora clique se já estiver com cartas viradas
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flip')) return;

    card.classList.add('flip');
    flippedCards.push(card);

    // Se duas cartas estiverem viradas, verifica se são iguais
    if (flippedCards.length === 2) {
      lockBoard = true;

      const [first, second] = flippedCards;
      const firstImg = first.querySelector('.back').style.backgroundImage;
      const secondImg = second.querySelector('.back').style.backgroundImage;

      // Par correto encontrado
      if (firstImg === secondImg) {
        flippedCards = [];
        lockBoard = false;
        matched++;

        // Verifica se o jogo terminou
        if (matched === 10) {
          setTimeout(() => {
            showEndGame();
          }, 1500); // Pausa após encontrar o último par
        }

        // Par errado: vira as cartas de volta
      } else {
        setTimeout(() => {
          first.classList.remove('flip');
          second.classList.remove('flip');
          flippedCards = [];
          lockBoard = false;
        }, 800);
      }
    }
  });

  board.appendChild(card);
});

// Botão para avançar para a próxima fase
const basePath = window.location.hostname.includes("github.io")
  ? "/carta-gamificada"
  : "";

nextButton.addEventListener('click', () => {
  window.location.href = `${basePath}/fase3/labirinto.html`;
});