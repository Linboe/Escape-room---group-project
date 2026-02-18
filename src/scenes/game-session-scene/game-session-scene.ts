import './game-session-scene.scss';
import { completeRoom } from '../../store/session/session-memory';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';
import { renderStatusBar } from '../../components/status-bar/status-bar';
import { getIsGameCompleted } from '../../store/session/session-memory';
import { renderGameOverScene } from '../game-over-scene/game-over-scene';

console.log('connected game session scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameSessionScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ''; // reset

  // innerHTML method
  //    sceneWrapper.innerHTML = `<h2>Game session scene</h2>`;

  // Imperative DOM building method
  const h2PlaceholderText = document.createElement('h2');
  h2PlaceholderText.textContent = 'Game session scene';
  sceneWrapper.append(h2PlaceholderText);

  // TEST-knapp för att simulera att ett rum klaras
  const solveRoomBtn = document.createElement('button');
  solveRoomBtn.textContent = 'Complete Room (test)';
  solveRoomBtn.addEventListener('click', () => {
    completeRoom();            // 1. uppdaterar progress (0/6 -> 6/6)
    saveGameToLocalStorage();  // 2. sparar progress i localStorage
    renderStatusBar();         // 3. uppdaterar UI

    if (getIsGameCompleted()) {
      renderGameOverScene();    // 4. om spelet är klart, rendera game over-scenen/går till Game Over när 6/6 är nått
    }

    console.log('Room completed (test)');
  });

  sceneWrapper.append(solveRoomBtn);
}