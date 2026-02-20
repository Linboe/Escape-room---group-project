import './main-menu-scene.scss';

console.log('connected main menu scene');

const sceneWrapper = document.getElementById(
  'sceneWrapper',
) as HTMLDivElement | null;

export function renderMainMenuScene() {
  if (!sceneWrapper) return;
  sceneWrapper.innerHTML = ``; // reset

  sceneWrapper.innerHTML = `
        <div class="main-menu">
            <h1>Main-menu</h1>
            <div class="menu-buttons">
                <button id="start-game" class="menu-btn primary">▶ Starta Spel</button>
                <button id="load-game" class="menu-btn">💾 Ladda Sparat Spel</button>
                <button id="settings" class="menu-btn">⚙️ Inställningar</button>
                <button id="about" class="menu-btn">ℹ️ Om Spelet</button>
                <button id="logout" class="menu-btn secondary">🚪 Logga Ut</button>
            </div>
        </div>
    `;

  /* -------------- Btn & Event Listeners ------------------
  ---------------------------------------------------------- */
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

  /* ---------------- Handler function  --------------------
  ---------------------------------------------------------- */
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
}
