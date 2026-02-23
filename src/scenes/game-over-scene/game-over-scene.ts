import './game-over-scene.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';

console.log('connected game over scene');

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene(score: number = 0) {
    if (!sceneWrapper) return;

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
        // Logic to restart the game session
        // This could involve resetting game state, navigating to the main menu, etc.
        console.log('Retry button clicked');
    });

    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.addEventListener('click', () => {
        if (state.screen === "gameover")
        state.screen = "menu"; 
        render();
    });

    const loggOutButton = document.createElement('button');
    loggOutButton.textContent = 'End Game';
    loggOutButton.addEventListener('click', () => {
        // Logic to log out the user
        console.log('Log Out button clicked');
         if (state.screen === "gameover")
        state.screen = "login"; 
        render();
    });

    container.appendChild(retryButton);
    container.appendChild(mainMenuButton);
    container.appendChild(loggOutButton);
    sceneWrapper.appendChild(container);
};
