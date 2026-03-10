import './game-over-scene.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { loadGameFromLocalStorage } from '../../store/database/local-storage-database';
import { refetchGamestate, stopAllStatusBarTimers, startStatusBarTimers } from '../../components/status-bar/status-bar';

console.log('connected game over scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene(score: number = 0) {
    if (!sceneWrapper) return;
    stopAllStatusBarTimers();

    sceneWrapper.innerHTML = ''; // reset

    const container = document.createElement('div');
    container.classList.add('game-over-container');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('game-over-buttons-container');

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => {
        stopAllStatusBarTimers(); // stoppar alla timers 
        loadGameFromLocalStorage(); // läser in all data från localstorage och lägger tillbaka i state
        refetchGamestate(); 
        state.screen = 'room';
        render();
        startStatusBarTimers(); // startar timers igen när spelare klickat på retry
        // Logic to restart the game session
        // This could involve resetting game state, navigating to the main menu, etc.
    });

    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.addEventListener('click', () => {
        if (state.screen === 'gameover')
            state.screen = 'menu';
        render();
    });

    const loggOutButton = document.createElement('button');
    loggOutButton.textContent = 'End Game';
    loggOutButton.addEventListener('click', () => {
        // Logic to log out the user
        console.log('Log Out button clicked');
        if (state.screen === 'gameover')
            state.screen = 'login';
        render();
    });

    const title = document.createElement('h2');
    title.textContent = 'GAME OVER';

    const scoreText = document.createElement('p');
    scoreText.textContent = `Your score: ${score}`;

    buttonsContainer.appendChild(retryButton);
    buttonsContainer.appendChild(mainMenuButton);
    buttonsContainer.appendChild(loggOutButton);

    container.append(title, scoreText, buttonsContainer);

    sceneWrapper.appendChild(container);
};
