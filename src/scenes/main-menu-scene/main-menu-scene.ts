import './main-menu-scene.scss';
import { state } from '../../state/gamestate';
import { loadGameFromLocalStorage } from '../../store/database/local-storage-database';
import { startStatusBarTimers, stopAllStatusBarTimers, refetchGamestate, renderStatusBar } from '../../components/status-bar/status-bar';

console.log('connected main menu scene');

export function renderMainMenuScene(
    sceneWrapper: HTMLDivElement | null,
    render: () => void
) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = ''; // reset

    sceneWrapper.innerHTML = `
        <div class="main-menu">
            <h2>The Dopefish Admirers</h2>
            <div class="menu-buttons">
                <button id="startGame" class="menu-btn primary">Start game</button>
                ${state.isReturningPlayer ? '<button id="loadGame" class="menu-btn">Load game</button>' : ''}
                <button id="about" class="menu-btn">About</button>
                <button id="logout" class="menu-btn secondary">Log out</button>
            </div>
        </div>
    `;

    // --------------- DOM ELEMENTS ----------------
    // ----------------------------------------------

    const startGameBtn = document.getElementById('startGame') as HTMLButtonElement | null;
    const loadGameBtn = document.getElementById('loadGame') as HTMLButtonElement | null;
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
            loadGameFromLocalStorage();
            refetchGamestate();
            stopAllStatusBarTimers();
            renderStatusBar();
            state.screen = 'room';
            render();
            startStatusBarTimers();
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
}
