import './main-menu-scene.scss';
import { state } from '../../state/gamestate';
import { renderStatusBar } from '../../components/status-bar/status-bar';

console.log('connected main menu scene');

export function renderMainMenuScene(
    sceneWrapper: HTMLDivElement | null,
    render: () => void
) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = ''; // reset

    sceneWrapper.innerHTML = `
        <div class="main-menu">
            <h1>The Dopefish Admirers</h1>
            <div class="menu-buttons">
                <button id="startGame" class="menu-btn primary">▶ Start game</button>
                <button id="loadGame" class="menu-btn">💾 Load game</button>
                <button id="settings" class="menu-btn">⚙️ Settings</button>
                <button id="about" class="menu-btn">ℹ️ About</button>
                <button id="logout" class="menu-btn secondary">🚪 Log out</button>
            </div>
        </div>
    `;

    // --------------- DOM ELEMENTS ----------------
    // ----------------------------------------------

    const startGameBtn = document.getElementById('startGame') as HTMLButtonElement | null;
    const loadGameBtn = document.getElementById('loadGame') as HTMLButtonElement | null;
    const settingsBtn = document.getElementById('settings') as HTMLButtonElement | null;
    const aboutBtn = document.getElementById('about') as HTMLButtonElement | null;
    const logoutBtn = document.getElementById('logout') as HTMLButtonElement | null;

    // ------ EVENT HANDLERS & FUNCTIONS ---------
    // ----------------------------------------------

    startGameBtn?.addEventListener('click', () => { //? betyder om det inte är null
        if (state.screen === 'menu') {
            state.currentRoom = 0;          // Starta från första rummet
            state.screen = 'room';
            renderStatusBar();
            render();               // Kör render() som kommer anropa renderNextRoom()
        }
    });

    loadGameBtn?.addEventListener('click', () => { // TODO
        if (state.screen === 'menu') {
            alert('Ännu inte implementerat, här kommer sparat spel laddas in');
            //state.screen = "savedgame";
            renderStatusBar();
            render();
        }
    });

    settingsBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            renderSettings();
        }
    });


    aboutBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            state.screen = 'about';
            render();
        }
    });

    logoutBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            state.screen = 'login';  // Byt till login skärmen
            render();
        }
    });


    function renderSettings() { // TODO
        alert('Ännu inte implementerat, här kommer inställningarna visas på något sätt');
    }

    /* function handleLoadGame() {
         console.log('Ladda sparat spel'); //Visa sparade spel
     }
 
     function handleSettings() {
         console.log('Inställningar'); //Visa inställningar (ljud, ljus, grafik)
     }
   */
}
