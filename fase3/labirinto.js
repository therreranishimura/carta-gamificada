document.addEventListener('DOMContentLoaded', () => {
  const maze = document.getElementById('maze');
  const rows = 23;
  const cols = 45;
  let playerPosition = { row: 0, col: 0 };

  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];

  // Elementos da tela fim de jogo
  const endGameOverlay = document.getElementById('endGame');
  const nextButton = document.getElementById('nextButton');

  // Exibe a tela fim de jogo
  function showEndGame() {
    endGameOverlay.classList.add('show');
  }

  // Funções utilitárias
  function isInBounds(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }

  function isWall(row, col) {
    return maze.rows[row].cells[col].classList.contains('wall');
  }

  function isGoal(row, col) {
    return maze.rows[row].cells[col].classList.contains('goal');
  }

  // Fisher-Yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Cria uma grade totalmente preenchida de paredes
  function createMaze() {
    maze.innerHTML = '';
    for (let r = 0; r < rows; r++) {
      const row = maze.insertRow();
      for (let c = 0; c < cols; c++) {
        const cell = row.insertCell();
        cell.className = 'wall';
      }
    }
  }

  function isValidCell(row, col) {
    return isInBounds(row, col) && isWall(row, col);
  }

  // Função recursiva que abre caminhos a partir da célula atual, usando profundidade
  function generateMaze(row, col) {
    maze.rows[row].cells[col].classList.remove('wall');
    const shuffledDirections = shuffle([...directions]);
    for (const dir of shuffledDirections) {
      const newRow = row + dir.row * 2;
      const newCol = col + dir.col * 2;

      if (isValidCell(newRow, newCol)) {
        maze.rows[row + dir.row].cells[col + dir.col].classList.remove('wall');
        generateMaze(newRow, newCol);
      }
    }
  }

  // Define o objetivo (goal) no canto inferior direito e abre caminho ao redor
  function setGoal() {
    maze.rows[rows - 1].cells[cols - 1].classList.remove('wall');
    maze.rows[rows - 1].cells[cols - 1].classList.add('goal');
  }

  // Move o jogador se a célula destino não for parede nem objetivo
  // Após mover, verifica se está adjacente ao objetivo
  function movePlayer(newRow, newCol) {
    if (isInBounds(newRow, newCol) && !isWall(newRow, newCol) && !isGoal(newRow, newCol)) {
      maze.rows[playerPosition.row].cells[playerPosition.col].classList.remove('player');
      maze.rows[newRow].cells[newCol].classList.add('player');
      playerPosition = { row: newRow, col: newCol };
    }


    // Checa após a movimentação se o jogador está adjacente ao goal
    if (
      Math.abs(playerPosition.row - (rows - 1)) + Math.abs(playerPosition.col - (cols - 1)) === 1
    ) {
      setTimeout(() => { // Se o jogador estiver ao lado do objetivo, exibe a tela final após 1.5s
        showEndGame();
      }, 1500);

    }
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(playerPosition.row - 1, playerPosition.col);
        break;
      case 'ArrowDown':
        movePlayer(playerPosition.row + 1, playerPosition.col);
        break;
      case 'ArrowLeft':
        movePlayer(playerPosition.row, playerPosition.col - 1);
        break;
      case 'ArrowRight':
        movePlayer(playerPosition.row, playerPosition.col + 1);
        break;
    }
  });

  // Inicializa o labirinto, gera o caminho e posiciona o jogador
  function startGame() {
    createMaze();
    generateMaze(0, 0);
    setGoal();

    maze.rows[0].cells[0].classList.add('player');
    playerPosition = { row: 0, col: 0 };
  }

  startGame();

  // Botão para avançar para a próxima fase
  nextButton.addEventListener('click', () => {
    window.location.href = '/carta-gamificada/fase4/enigma.html';
  });

});

