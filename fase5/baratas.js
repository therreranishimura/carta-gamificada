// Referências
const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('scoreboard');
const message = document.getElementById('message');
const goal = document.getElementById('goal');


// Sons
const jumpSound = new Audio('sounds/jump.wav');
const squishSound = new Audio('sounds/squish.wav');
const gameOverSound = new Audio('sounds/gameover.wav');
const victorySound = new Audio('sounds/victory.wav');

// Variáveis
const GROUND_LEVEL = 20;
let isJumping = false;
let jumpHeight = 150;
let jumpSpeed = 24;
let jumpPosition = GROUND_LEVEL;
let score = 0;
let gameStarted = false;
let gameRunning = true;

// Função que faz o jogador pular
function jump() {
    if (isJumping || !gameRunning) return;
    isJumping = true;
    jumpSound.play();
    let upInterval = setInterval(() => {
        if (jumpPosition >= GROUND_LEVEL + jumpHeight) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (jumpPosition <= GROUND_LEVEL) {
                    clearInterval(downInterval);
                    isJumping = false;
                    jumpPosition = GROUND_LEVEL;
                    player.style.bottom = `${GROUND_LEVEL}px`;
                } else {
                    jumpPosition -= jumpSpeed;
                    player.style.bottom = `${jumpPosition}px`;
                }
            }, 20);
        } else {
            jumpPosition += jumpSpeed;
            player.style.bottom = `${jumpPosition}px`;
        }
    }, 20);
}

// Cria uma barata inimiga e inicia sua movimentação
function createEnemy() {
    if (!gameRunning) return;

    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = '1000px';
    game.appendChild(enemy);
    let enemyPosition = 1000;


    const moveInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(moveInterval);
            if (enemy.parentNode) enemy.remove();
            return;
        }

        enemyPosition -= 10;
        enemy.style.left = `${enemyPosition}px`;

        // Posição horizontal do jogador
        const playerLeft = 100;
        const playerRight = 160;

        // Posição horizontal do inimigo
        const enemyLeft = enemyPosition + 30;
        const enemyRight = enemyLeft + 60;

        // Verifica colisão entre o jogador e o inimigo
        const horizontalOverlap = !(enemyRight < playerLeft || enemyLeft > playerRight);

        // Colisão frontal (barata acerta jogador - game over)
        if (horizontalOverlap && jumpPosition <= GROUND_LEVEL + 60 && !enemy.classList.contains('dead')) {
            gameRunning = false;
            gameOverSound.play();
            message.textContent = 'Você foi derrotado por uma barata!';
            message.style.display = 'block';
            clearInterval(moveInterval);
            return;
        }

        // Colisão por cima (jogador esmaga barata)
        if (horizontalOverlap && jumpPosition > GROUND_LEVEL + 60 && !enemy.classList.contains('dead')) {
            squishSound.play();
            enemy.classList.add('dead');
            score++;

            // Atualiza barra de progresso
            const percentage = (score / 30) * 100;
            document.getElementById('progressBar').style.width = `${percentage}%`;


            setTimeout(() => {
                if (enemy.parentNode) enemy.remove();
            }, 500);
        }

        // Remove barata fora da tela
        if (enemyPosition < -100) {
            clearInterval(moveInterval);
            if (enemy.parentNode) enemy.remove();
        }

        // Exibe mensagem de vitória e botão para próxima fase
        if (score >= 30 && gameRunning) {
            gameRunning = false;
            victorySound.play();
            message.textContent = 'Parabéns! Você salvou sua princesa e merece receber seu prêmio...';
            message.style.display = 'block';
            goal.style.display = 'block';

            const nextButton = document.getElementById('nextButton');
            nextButton.style.display = 'block';
            nextButton.addEventListener('click', () => {
                window.location.href = '/carta-gamificada/final/final.html'; // Link para a próxima página
            });
        }

    }, 20); // 20ms = 50 atualizações por segundo (controla a velocidade do movimento da barata)
}

// Inicia o jogo ao clicar em "Iniciar Jogo"
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    gameStarted = true;
    gameRunning = true;
});


// Teclas de controle: espaço para pular, enter para reiniciar
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;

    if (e.code === 'Space') {
        jump();
    } else if (e.code === 'Enter' && !gameRunning) {
        location.reload();
    }
});

// Gera novas baratas a cada 2 segundos
const enemySpawner = setInterval(() => {
    if (gameRunning && gameStarted) {
        createEnemy();
    }
}, 2000);