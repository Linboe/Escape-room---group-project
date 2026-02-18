import './main-menu-scene.scss';
import { resetSessionMemory } from '../../store/session/session-memory';
import { clearLocalStorageSave } from '../../store/database/local-storage-database';
import { renderStatusBar } from '../../components/status-bar/status-bar';
import { renderGameSessionScene } from '../game-session-scene/game-session-scene';

console.log('connected main menu scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderMainMenuScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ''; // reset

  // innerHTML method
  //    sceneWrapper.innerHTML = `<h2>Main menu scene</h2>`;

  // Imperative DOM building method
  const h2PlaceholderText = document.createElement('h2');
  h2PlaceholderText.textContent = 'Main menu scene';
  sceneWrapper.append(h2PlaceholderText);

  // Reset-knapp (läggs till – radera inget ovan)
  const resetBtn = document.createElement('button');
  resetBtn.id = 'resetBtn';
  resetBtn.textContent = 'Reset Game';

  resetBtn.addEventListener('click', () => {
    resetSessionMemory();        // nollställer session-state (progress, rum, etc.)
    clearLocalStorageSave();     // rensar sparad data i localStorage
    renderStatusBar();           // uppdaterar status bar direkt
    renderGameSessionScene();    // starta om spelet direkt
    console.log('Game reset');
  });

  sceneWrapper.append(resetBtn);
}