import './game-over-scene.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { loadGameFromLocalStorage, saveGameToLocalStorage } from '../../store/database/local-storage-database';
import { refetchGamestate, stopAllStatusBarTimers, startStatusBarTimers } from '../../components/status-bar/status-bar';

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene(score: number = 0) {
    if (!sceneWrapper) return;
    stopAllStatusBarTimers();

    sceneWrapper.innerHTML = ''; // reset

    const container = document.createElement('div');
    container.classList.add('game-over-container');

    const title = document.createElement('h2');
    title.textContent = 'GAME OVER';
    container.appendChild(title);

    const scoreText = document.createElement('p');
    scoreText.textContent = `Your score: ${score}`;
    container.appendChild(scoreText);

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
        saveGameToLocalStorage();
        state.screen = 'menu';
        render();
    });

    const logOutButton = document.createElement('button');
    logOutButton.textContent = 'End Game';
    logOutButton.addEventListener('click', () => {
        saveGameToLocalStorage();
        state.screen = 'login';
        render();
    });

    container.appendChild(retryButton);
    container.appendChild(mainMenuButton);
    container.appendChild(logOutButton);
    sceneWrapper.appendChild(container);
};
