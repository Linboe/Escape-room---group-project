import './room1.scss';

// export function renderRoom1Scene() {
//   const sceneWrapper = document.getElementById("sceneWrapper");
//   if (!sceneWrapper) return;

//   sceneWrapper.innerHTML = `
//     <section class="room room-1">
//       <h1>Room 1</h1>
//       </section>
//       `;
// }

export function room1(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;

  sceneWrapper.innerHTML = `
  <div class="room1">
    <div class="game-session-wrapper">
        <h2>Rum 1</h2>
        
        <div class="choices">
          <button id="rockBtn">Rock</button>
          <button id="paperBtn">Paper</button>
          <button id="scissorsBtn">Scissors</button>
          </div>
        
        
        <div id="playerDisplay" class="player-display">Player:</div>
        <div id="computerDisplay" class="computer-display">Computer:</div>
        <div id="resultDisplay" class="result-display"></div>
        
        <div class="score-display">
        Player Score:
        <span id="playerScoreDisplay" class="player-score-display">0</span>
        </div>
        
        <div class="score-display">
        Computer Score:
        <span id="computerScoreDisplay" class="computer-score-display">0</span>
        </div>
        
        <div class="action-btn-container">
        <button id="actionBtn" class="hidden"></button>
          </div>

        </div>
        `;

  const rockBtn = document.getElementById('rockBtn') as HTMLButtonElement;
  const paperBtn = document.getElementById('paperBtn') as HTMLButtonElement;
  const scissorsBtn = document.getElementById('scissorsBtn') as HTMLButtonElement;
  const actionBtn = document.getElementById('actionBtn') as HTMLButtonElement;

  const playerDisplay = document.getElementById('playerDisplay') as HTMLDivElement;
  const computerDisplay = document.getElementById('computerDisplay') as HTMLDivElement;
  const resultDisplay = document.getElementById('resultDisplay') as HTMLDivElement;

  const playerScoreDisplay = document.getElementById('playerScoreDisplay') as HTMLSpanElement;
  const computerScoreDisplay = document.getElementById('computerScoreDisplay') as HTMLSpanElement;

  let playerScore = 0;
  let computerScore = 0;
  const WIN_SCORE = 3;

  function playGame(playerChoice: string) {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';

    if (playerScore === WIN_SCORE || computerScore === WIN_SCORE) {
      rockBtn.disabled = true;
      paperBtn.disabled = true;
      scissorsBtn.disabled = true;
    }

    if (playerChoice === computerChoice) {
      result = "IT'S A TIE!!";
    } else {
      switch (playerChoice) {
        case 'Rock':
          result = computerChoice === 'Scissors' ? 'YOU WIN!' : 'YOU LOSE!';
          break;
        case 'Paper':
          result = computerChoice === 'Rock' ? 'YOU WIN!' : 'YOU LOSE!';
          break;
        case 'Scissors':
          result = computerChoice === 'Paper' ? 'YOU WIN!' : 'YOU LOSE!';
          break;
      }
    }

    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove('green-text', 'red-text');

    switch (result) {
      case 'YOU WIN!':
        resultDisplay.classList.add('green-text');
        playerScore++;
        playerScoreDisplay.textContent = playerScore.toString();
        break;
      case 'YOU LOSE!':
        resultDisplay.classList.add('red-text');
        computerScore++;
        computerScoreDisplay.textContent = computerScore.toString();
        break;
    }

    if (playerScore === WIN_SCORE) {
      resultDisplay.textContent = 'You won!';
      actionBtn.textContent = 'Go to the next room';
      actionBtn.classList.remove('hidden');

      disableGameButtons(true);
      actionBtn.onclick = () => next();
    } else if (computerScore === WIN_SCORE) {
      resultDisplay.textContent = 'You lost!';
      actionBtn.textContent = 'Try again';
      actionBtn.classList.remove('hidden');

      disableGameButtons(true);
      actionBtn.onclick = () => restartGame();
    }
  }

  function restartGame() {
    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';

    playerDisplay.textContent = 'Player: ';
    computerDisplay.textContent = 'Computer: ';
    resultDisplay.textContent = '';

    resultDisplay.classList.remove('green-text', 'red-text');

    disableGameButtons(false);
    actionBtn.classList.add('hidden');
  }

  function disableGameButtons(disabled: boolean) {
    rockBtn.disabled = disabled;
    paperBtn.disabled = disabled;
    scissorsBtn.disabled = disabled;
  }

  rockBtn.addEventListener('click', () => playGame('Rock'));
  paperBtn.addEventListener('click', () => playGame('Paper'));
  scissorsBtn.addEventListener('click', () => playGame('Scissors'));

  // <p>Välj rätt knapp för att gå vidare:</p>
  // <button id="wrong">Fel knapp</button>
  // <button id="correct">Rätt knapp</button>
  // <p id="message"></p>

  //   const correctBtn: HTMLButtonElement | null =
  //     document.querySelector("#correct");
  //   const wrongBtn: HTMLButtonElement | null = document.querySelector("#wrong");
  //   const message: HTMLParagraphElement | null =
  //     document.querySelector("#message");

  //   correctBtn?.addEventListener("click", () => {
  //     next(); // går vidare till nästa rum
  //   });

  //   wrongBtn?.addEventListener("click", () => {
  //     if (message) {
  //       message.textContent = "Fel val! Försök igen.";
  //     }
  //   });
}
