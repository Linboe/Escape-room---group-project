import './main-menu-scene.scss';
import { resetSessionMemory } from '../../store/session/session-memory';
import { clearLocalStorageSave } from '../../store/database/local-storage-database';
import { renderStatusBar } from '../../components/status-bar/status-bar';
import { renderGameSessionScene } from '../game-session-scene/game-session-scene';

console.log('connected main menu scene');

const sceneWrapper = document.getElementById(
  'sceneWrapper',
) as HTMLButtonElement | null;

export function renderMainMenuScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ``; // reset

  sceneWrapper.innerHTML = `
        <div class="main-menu">
            <h1>Main-menu</h1>
            <div class="menu-buttons">
                <button id="start-game" class="menu-btn primary">▶ Start game</button>
                <button id="load-game" class="menu-btn">💾 Load game</button>
                <button id="settings" class="menu-btn">⚙️ Settings</button>
                <button id="about" class="menu-btn">ℹ️ About</button>
                <button id="logout" class="menu-btn secondary">🚪 Log out</button>
            </div>
        </div>
    `;

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
  //-------------- Btn & Event Listeners ------------------
  //----------------------------------------------------------
  /*
const startGameBtn = document.getElementById('start-game') as HTMLButtonElement | null;
const loadGameBtn = document.getElementById('load-game') as HTMLButtonElement | null;
const settingsBtn = document.getElementById('settings') as HTMLButtonElement | null;
const aboutBtn = document.getElementById('about') as HTMLButtonElement | null;
const logoutBtn = document.getElementById('logout') as HTMLButtonElement | null;

startGameBtn?.addEventListener('click', handleStartGame); //? betyder om det inte är null
loadGameBtn?.addEventListener('click', handleLoadGame);
settingsBtn?.addEventListener('click', handleSettings);
aboutBtn?.addEventListener('click', handleAbout);
logoutBtn?.addEventListener('click', handleLogout);
*/

  // ---------------- Handler function  --------------------
  //----------------------------------------------------------
  /*    
function handleStartGame() {
    console.log('Starta spel'); //Byter scen, t.ex. renderGameSessionScene();
}

function handleLoadGame() {
    console.log('Ladda sparat spel'); //Visa sparade spel
}

function handleSettings() {
    console.log('Inställningar'); //Visa inställningar (ljud, ljus, grafik)
}

function handleAbout() {
    console.log('Om spelet'); //info om spelet, ny sida?
}

function handleLogout() {
    console.log('Logga ut'); //tillbaka till login
*/

