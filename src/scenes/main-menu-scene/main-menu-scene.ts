import './main-menu-scene.scss';

console.log('connected main menu scene');

const sceneWrapper: HTMLDivElement | null =
  document.getElementById('sceneWrapper');

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

  /* -------------- Btn & Event Listeners ------------------
  ----------------------------------------------------------

const startGameBtn: HTMLButtonElement | null = document.getElementById('start-game');
const loadGameBtn: HTMLButtonElement | null = document.getElementById('load-game');
const settingsBtn: HTMLButtonElement | null = document.getElementById('settings');
const aboutBtn: HTMLButtonElement | null = document.getElementById('about');
const logoutBtn: HTMLButtonElement | null = document.getElementById('logout');

startGameBtn?.addEventListener('click', handleStartGame); //? betyder om det inte är null
loadGameBtn?.addEventListener('click', handleLoadGame);
settingsBtn?.addEventListener('click', handleSettings);
aboutBtn?.addEventListener('click', handleAbout);
logoutBtn?.addEventListener('click', handleLogout);


  /* ---------------- Handler function  --------------------
  ----------------------------------------------------------
    
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
